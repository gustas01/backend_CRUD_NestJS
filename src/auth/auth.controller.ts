import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { UploadedFile, UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { User } from 'src/decorators/user/user.decorator';
import { FileService } from 'src/file/file.service';
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
    private authService: AuthService,
    private fileService: FileService
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
  async me(@User('email') user) {
    return { user };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${user.id}.png`
    );
    try {
      await this.fileService.upload(photo, path);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return { success: true };
  }
}
