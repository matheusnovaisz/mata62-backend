import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), InstitutionsModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
