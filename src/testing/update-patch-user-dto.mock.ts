import { Role } from '../enums/role.enum';
import { UpdatePatchUserDto } from '../users/dto/update-patch-user-dto';

export const updatePatchUserDTOMock: UpdatePatchUserDto = {
  name: 'gustavo',
  age: 28,
  email: 'gustavo@email.com',
  password: '123123AaBb',
  role: Role.Admin
};
