import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber } from 'class-validator';
import { Status } from '../enums/status.enum';
import { CreateDiplomaDto } from './create-diploma.dto';

export class UpdateDiplomaDto extends PartialType(CreateDiplomaDto) {
  @IsEnum(Status)
  status: Status;

  @IsNumber()
  validator_id: number;
}
