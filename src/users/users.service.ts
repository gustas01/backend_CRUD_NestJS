import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
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
      user.password = await bcryptjs.hash(
        user.password,
        await bcryptjs.genSalt()
      );
      const newUser = this.usersRepository.create(user)
      this.usersRepository.save(newUser)
      return newUser
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
        
        console.log(id, user);
      await this.usersRepository.update(id, user);
      return this.read(id)
    } catch (e) {
      return { message: e.response };
    }
  }

  async delete(id: number) {
    try {
      await this.read(id);
      return await this.usersRepository.delete(id);
    } catch (e) {
      return { message: e.response };
    }
  }
}
