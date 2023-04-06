import { Controller, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // eslint-disable-next-line prettier/prettier
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common/decorators';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ParamId } from 'src/decorators/param-id/param-id.decorator';
import { Roles } from 'src/decorators/role/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { LogInterceptor } from 'src/interceptors/log/log.interceptor';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserService } from './user.service';

@UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
// @UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.User)
  @SkipThrottle() //ignorando o Throttle para essa rota, ou seja, posso acesar quantas vezes quiser
  @Get()
  async index() {
    return this.userService.index();
  }
  
  @Throttle(5, 60) //substituindo as confiruações de acesso/por que está no appModule para essa rota
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  //usando decorator personalizado ParamId
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async read(@ParamId() id: number) {
    return this.userService.read(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.updatePut(id, body);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async updateWithPatch(
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.updatePatch(id, body);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
