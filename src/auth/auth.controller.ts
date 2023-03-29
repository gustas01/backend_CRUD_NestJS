import { Body, Controller, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post()
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forget(body.email);
  }

  @Post()
  async reset(@Body() body: AuthResetDTO) {
    return this.authService.reset(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    return { me: req.tokenPayload };
  }
}
