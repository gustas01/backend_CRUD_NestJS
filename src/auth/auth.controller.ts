import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {
  UploadedFile,
  UploadedFiles,
  UseGuards
} from '@nestjs/common/decorators';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor
} from '@nestjs/platform-express';
import { User } from '../decorators/user/user.decorator';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { UserEntity } from '../users/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
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

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDTO) {
    return this.authService.reset(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user: UserEntity) {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 56 })
        ]
      })
    )
    photo: Express.Multer.File
  ) {
    const filename = `photo-${user.id}.png`;
    try {
      await this.fileService.upload(photo, filename);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return { success: true };
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(
    @User() user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return files;
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'documents', maxCount: 10 }
    ])
  )
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(
    @User() user: UserEntity,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] }
  ) {
    return { files };
  }
}
