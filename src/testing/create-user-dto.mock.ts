import { Role } from "../enums/role.enum";
import { CreateUserDto } from "../users/dto/create-user-dto";

export const createUserDTOMock : CreateUserDto = {
  name: 'gustavo',
  age: 28,
  email: 'gustavo@email.com',
  password: '123123AaBb',
  role: Role.Admin
}