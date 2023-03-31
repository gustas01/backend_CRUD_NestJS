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
  UseGuards
} from '@nestjs/common/decorators';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ParamId } from 'src/decorators/param-id/param-id.decorator';
import { Roles } from 'src/decorators/role/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UsersService } from './users.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Roles(Role.Admin, Role.User)
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
  @Get(':id')
  async read(@ParamId() id: number) {
    return this.userService.read(id);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.updatePut(id, body);
  }

  @Patch(':id')
  async updateWithPatch(
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.updatePatch(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
