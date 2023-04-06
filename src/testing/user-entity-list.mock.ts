import { Role } from "../enums/role.enum";
import { UserEntity } from "../users/entity/user.entity";

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'gustavo',
    age: 28,
    email: 'gustavo@email.com',
    password: '$2a$10$0tvO98koLypJF/RODsnTp.e.BO0xDqj9k.iBYBk.WleR5JPkOxj/K',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date() 
}, {
  id: 2,
  name: 'claire',
  age: 28,
  email: 'clairezinha@email.com',
  password: '$2a$10$0tvO98koLypJF/RODsnTp.e.BO0xDqj9k.iBYBk.WleR5JPkOxj/K',
  role: Role.User,
  createdAt: new Date(),
  updatedAt: new Date() 
}, {
  id: 3,
  name: 'ada',
  age: 28,
  email: 'adinha@email.com',
  password: '$2a$10$0tvO98koLypJF/RODsnTp.e.BO0xDqj9k.iBYBk.WleR5JPkOxj/K',
  role: Role.User,
  createdAt: new Date(),
  updatedAt: new Date() 
},]