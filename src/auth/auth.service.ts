import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async createToken(payload: string) {
    return this.jwtService.sign(payload);
  }

  async checkToken(token: string) {
    return this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    return user;
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email inválidos');
    //enviar email para fazer a restauração da senha
    return true;
  }

  async reset(newPassword: string, token: string) {
    const id = 0;

    await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        password: newPassword
      }
    });
  }
}
