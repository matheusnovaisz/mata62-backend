import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInstitutionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  MEC: string;

  @IsOptional()
  maintainer: string;
}
