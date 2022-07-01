import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  degree: string;

  @IsNotEmpty()
  emec: string;

  @IsNotEmpty()
  institutionId: number;
}
