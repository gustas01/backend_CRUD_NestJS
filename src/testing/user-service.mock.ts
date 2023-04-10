import { UserService } from "../users/user.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
  provide: UserService,
  useValue: {
    index:jest.fn().mockResolvedValue(userEntityList),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    read: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePut: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePatch: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue({ message: "Usuário excluído com sucesso!"}),
  }
}