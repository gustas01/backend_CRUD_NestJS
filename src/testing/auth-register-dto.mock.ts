import { AuthRegisterDto } from '../auth/dto/auth-register.dto';
import { Role } from '../enums/role.enum';

export const authRegisterDTOMock: AuthRegisterDto = {
  name: 'gustavo',
  age: 28,
  email: 'gustavo@email.com',
  password: '123123AaBb',
  role: Role.Admin
};
