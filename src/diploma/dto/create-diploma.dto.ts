import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDiplomaDto {
  @IsNumber()
  course_id: number;

  @IsNumber()
  applicant_id: number;

  @IsNotEmpty()
  student_name: string;

  @IsNotEmpty()
  file: string;
}
