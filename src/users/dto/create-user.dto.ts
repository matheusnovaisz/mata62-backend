import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  institution_id: number;
}
