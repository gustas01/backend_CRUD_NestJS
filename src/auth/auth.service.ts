import { MailerService } from '@nestjs-modules/mailer/dist';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    private mailerService: MailerService,
    
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  createToken(user: UserEntity) {
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

  checkToken(token: string) {
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
    const user = await this.usersRepository.findOne({where: {email}})

    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    if (!(await bcryptjs.compare(password, user.password)))
      throw new UnauthorizedException('Email ou senha inválidos');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy( { email } );
    if (!user) throw new UnauthorizedException('Email inválido');

    const token = this.jwtService.sign({
      id: user.id
    }, {
      expiresIn: '30 minutes',
      subject: String(user.id),
      issuer: 'forget',
      audience: 'users'
    })

    await this.mailerService.sendMail({
      subject: "Recuperação de senha",
      to: 'gustavoG@email.com',
      template: 'forget',
      context: {name: user.name, token}
    })

    return true;
  }

  async reset(newPassword: string, token: string) {
    try {
      const { id } = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      });

      newPassword = await bcryptjs.hash(newPassword, await bcryptjs.genSalt());
  
      await this.usersRepository.update(Number(id), {password: newPassword});
  
      const user = await this.userService.read(Number(id)) as UserEntity;
      
      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user: UserEntity = (await this.userService.create(data)) as UserEntity;
    return this.createToken(user);
  }

  isTokenValid(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
