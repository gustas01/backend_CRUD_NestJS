import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';

@Injectable()
export class UsersService {
  constructor() {}

  async create(user: CreateUserDto) {
    try {
      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );

      return await this.prismaService.user.create({ data: user });
    } catch (e) {
      return { message: 'Email já cadastrado' };
    }
  }

  async index() {
    return await this.prismaService.user.findMany();
  }

  async read(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });

      if (!user)
        throw new NotFoundException(`Usuário com id ${id} não encontrado`);
      return user;
    } catch (e) {
      return { message: e.response };
    }
  }

  async updatePut(id: number, user: UpdatePutUserDto) {
    try {
      await this.read(id);

      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );

      return await this.prismaService.user.update({
        data: user,
        where: { id }
      });
    } catch (e) {
      return { message: e.response };
    }
  }

  async updatePatch(id: number, user: UpdatePatchUserDto) {
    try {
      await this.read(id);

      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );

      return await this.prismaService.user.update({
        data: user,
        where: { id }
      });
    } catch (e) {
      return { message: e.response };
    }
  }

  async delete(id: number) {
    try {
      await this.read(id);
      return await this.prismaService.user.delete({ where: { id } });
    } catch (e) {
      return { message: e.response };
    }
  }
}
