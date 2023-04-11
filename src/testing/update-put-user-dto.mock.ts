import { Role } from '../enums/role.enum';
import { UpdatePutUserDto } from '../users/dto/update-put-user-dto';

export const updatePutUserDTOMock: UpdatePutUserDto = {
  name: 'gustavo',
  age: 28,
  email: 'gustavo@email.com',
  password: '123123AaBb',
  role: Role.Admin
};
