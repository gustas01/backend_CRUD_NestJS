import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth/auth.guard';
import { RoleGuard } from '../guards/role/role.guard';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { guardMock } from '../testing/guard.mock';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock]
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('guards', () => {
    it('check if guards are NOT being used in Controller level', () => {
      const guards: any[] = Reflect.getMetadata('__guards__', UserController);

      expect(guards).toBeUndefined();
    });

    it('check if guards are being used in method Index', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.index
      );

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });

    it('check if guards are NOT being used in method Create', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.create
      );
      expect(guards).toBeUndefined();
    });

    it('check if guards are being used in method Read', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.read
      );

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });

    it('check if guards are being used in method Update', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.update
      );

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });

    it('check if guards are being used in method UpdatePatch', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.updateWithPatch
      );

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });

    it('check if guards are being used in method Delete', () => {
      const guards: any[] = Reflect.getMetadata(
        '__guards__',
        userController.delete
      );

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('CRUD methods', () => {
    it('Index', async () => {
      const result = await userController.index();
      expect(result).toEqual(userEntityList);
    });

    it('Create', async () => {
      const result = await userController.create(createUserDTOMock);
      expect(result).toEqual(userEntityList[0]);
    });

    it('Read', async () => {
      const result = await userController.read(1);
      expect(result).toEqual(userEntityList[0]);
    });

    it('UpdatePut', async () => {
      const result = await userController.update(updatePutUserDTOMock, 1);
      expect(result).toEqual(userEntityList[0]);
    });

    it('UpdatePatch', async () => {
      const result = await userController.updateWithPatch(
        updatePutUserDTOMock,
        1
      );
      expect(result).toEqual(userEntityList[0]);
    });

    it('Delete', async () => {
      const result = await userController.delete(1);
      expect(result).toEqual({ message: 'Usuário excluído com sucesso!' });
    });
  });
});
