import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  CreateCoursePolicyHandler,
  DeleteCoursePolicyHandler,
  ReadCoursePolicyHandler,
  UpdateCoursePolicyHandler,
} from './policies/course.policies';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @CheckPolicies(new CreateCoursePolicyHandler())
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  @CheckPolicies(new ReadCoursePolicyHandler())
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @CheckPolicies(new ReadCoursePolicyHandler())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }
  @CheckPolicies(new UpdateCoursePolicyHandler())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }
  @CheckPolicies(new DeleteCoursePolicyHandler())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
