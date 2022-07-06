import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Request,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { DiplomaService } from './diploma.service';
import { CreateDiplomaDto } from './dto/create-diploma.dto';
import { UpdateDiplomaDto } from './dto/update-diploma.dto';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('diploma')
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body() createDiplomaDto: CreateDiplomaDto,
  ) {
    createDiplomaDto.applicant_id = req.user.id;
    createDiplomaDto.file = file.filename;
    console.log(file);
    return this.diplomaService.create(createDiplomaDto);
  }

  @Get()
  findAll() {
    return this.diplomaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diplomaService.findOne(+id);
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string) {
    const file = createReadStream(join(process.cwd(), `uploads/${filename}`));
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiplomaDto: UpdateDiplomaDto,
    @Request() req,
  ) {
    updateDiplomaDto.validator_id = req.user.id;
    return this.diplomaService.update(+id, updateDiplomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomaService.remove(+id);
  }
}
