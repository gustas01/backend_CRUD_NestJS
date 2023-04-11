import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
    ) 
  {}

  async index() {
    return await this.usersRepository.find();
  }

  
  async create(user: CreateUserDto) {
    try {      
      delete user.role
      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );
      const newUser = this.usersRepository.create(user)
      return this.usersRepository.save(newUser)
    } catch (e) {
      return { message: 'Email já cadastrado' };
    }
  }


  async read(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user)
        throw new NotFoundException(`Usuário com id ${id} não encontrado`);
      return user;
    } catch (e) {
      return { message: e };
    }
  }

  async updatePut(id: number, user: UpdatePutUserDto) {
    try {
      await this.read(id);

      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );

      await this.usersRepository.update(id, user);
      return this.read(id)
    } catch (e) {
      return { message: e.response };
    }
  }

  async updatePatch(id: number, user: UpdatePatchUserDto) {
    try {
      await this.read(id);
      
      if(user.password)
        user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
        
      await this.usersRepository.update(id, user);
      return this.read(id)
    } catch (e) {
      return { message: e.response };
    }
  }

  async delete(id: number) {
    try {
      await this.read(id);
      await this.usersRepository.delete(id);
      return { message: "Usuário excluído com sucesso!"} 
    } catch (e) {
      return { message: e.response };
    }
  }
}
