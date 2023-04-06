import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { updatePatchUserDTOMock } from '../testing/update-patch-user-dto.mock';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';


describe('UsersService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity> 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    // userService = await module.resolve(UsersService)
    userRepository = module.get(getRepositoryToken(UserEntity))

  });
  

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should test method INDEX', async () => {
    const result = await userService.index()
    expect(result).toEqual(userEntityList)
  });

  it('should test method CREATE', async () => {
    const result = await userService.create(createUserDTOMock)
    expect(result).toEqual(userEntityList[0])
  });

  it('should test method READ', async () => {
    const result = await userService.read(1)
    expect(result).toEqual(userEntityList[0])
  });

  it('should test method UPDATEPUT', async () => {
    const result = await userService.updatePut(1, updatePutUserDTOMock)
    expect(result).toEqual(userEntityList[0])
  });

  it('should test method UPDATEPATCH', async () => {
    const result = await userService.updatePatch(1, updatePatchUserDTOMock)
    expect(result).toEqual(userEntityList[0])
  });

  it('should test method DELETE', async () => {
    const result = await userService.delete(1)
    expect(result).toEqual({ message: "Usuário excluído com sucesso!"})
  });



});
