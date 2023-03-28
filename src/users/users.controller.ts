import { Controller, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // eslint-disable-next-line prettier/prettier
  Put
} from '@nestjs/common/decorators';
import { ParamId } from 'src/decorators/param-id/param-id.decorator';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async index() {
    return this.userService.index();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  //usando decorator personalizado
  @Get(':id')
  async read(@ParamId() id: number) {
    console.log(id);

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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
