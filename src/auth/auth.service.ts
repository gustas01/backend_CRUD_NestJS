import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UsersService
  ) {}

  async createToken(user: User) {
    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      {
        expiresIn: '7d',
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience
      }
    );
    return { token };
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email inválidos');
    //enviar email para fazer a restauração da senha
    return true;
  }

  async reset(newPassword: string, token: string) {
    const id = 0;

    const user = await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        password: newPassword
      }
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user: User = (await this.userService.create(data)) as User;
    return this.createToken(user);
  }

  async isTokenValid(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
