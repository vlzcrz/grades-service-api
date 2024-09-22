import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  createCalificacion(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':uuid')
  findCalificacionEstudiante(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.gradesService.findCalificacionEstudiante(uuid);
  }

  @Patch()
  updateCalificacion(@Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }
}
