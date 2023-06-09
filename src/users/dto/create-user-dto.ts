import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
  // eslint-disable-next-line prettier/prettier
  Min
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
