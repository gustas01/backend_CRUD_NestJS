import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    find: jest.fn().mockResolvedValue(userEntityList),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityList[0]),
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn().mockResolvedValue(userEntityList[0])
  }
};
