import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    try {
      return this.prismaService.user.create({ data: user });
    } catch (e) {
      return { error: 'Email já cadastrado' };
    }
  }

  async index() {
    return this.prismaService.user.findMany();
  }

  async read(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user)
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    return user;
  }

  async updatePut(id: number, user: UpdatePutUserDto) {
    await this.read(id);
    return this.prismaService.user.update({
      data: user,
      where: { id }
    });
  }

  async updatePatch(id: number, user: UpdatePatchUserDto) {
    await this.read(id);
    return this.prismaService.user.update({
      data: user,
      where: { id }
    });
  }

  async delete(id: number) {
    await this.read(id);
    return this.prismaService.user.delete({ where: { id } });
  }
}
