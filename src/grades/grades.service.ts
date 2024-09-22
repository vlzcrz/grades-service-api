import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';


@Injectable()
export class GradesService {

  constructor( 
    @InjectRepository(Grade)
    private gradesService: Repository<Grade>
  ){}

  async create(createGradeDto: CreateGradeDto) {
    const calificacion = this.gradesService.create(createGradeDto)
    if(!uuidValidateV4(calificacion.uuid_estudiante))
      throw new BadRequestException('La uuid de estudiante no es de tipo uuidv4 valido')
    const queryBuilder = this.gradesService.createQueryBuilder("grades")
    const calificacionExist = queryBuilder.where('uuid_estudiante = :uuid_estudiante AND asignatura = :asignatura', 
      {
        uuid_estudiante: calificacion.uuid_estudiante,
        asignatura: calificacion.asignatura
      }
    ).getExists()

    if(!calificacionExist)
      throw new BadRequestException('Ya existe una calificacion para este estudiante en la asignatura')
    if(!calificacion.comentario || calificacion.comentario == '')
      calificacion.comentario = ""

    await this.gradesService.save(calificacion)
    return calificacion
  }

  async findAll() {
    const grades = await this.gradesService.find()
    return grades
  }

  async findCalificacionEstudiante(uuid: string) {
    const queryBuilder = this.gradesService.createQueryBuilder("grades")
    const gradesByEstudianteExist = await queryBuilder.where('uuid_estudiante = :uuid_estudiante', {
      uuid_estudiante: uuid
    }).getExists()
    
    if(!gradesByEstudianteExist)
      throw new NotFoundException('No hay calificaciones asignadas para este estuidante')

    const gradesByEstudiante = await queryBuilder.where('uuid_estudiante = :uuid_estudiante', {
      uuid_estudiante: uuid
    }).getMany()
    return gradesByEstudiante
  }

  async update(uuid: string, updateGradeDto: UpdateGradeDto) {
    const calificacion = await this.gradesService.preload({
      uuid_calificacion: uuid,
      ...updateGradeDto
    })

    if(!calificacion)
      throw new NotFoundException('No se ha encontrado una calificacion con este uuid')

    await this.gradesService.save(calificacion)
    return calificacion
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}