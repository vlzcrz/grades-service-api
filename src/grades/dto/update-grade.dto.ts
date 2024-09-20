import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-grade.dto';
import { IsDecimal, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {

    @IsOptional()
    asignatura?: string

    @IsOptional()
    nombre_calificacion?: string

    @IsNumber()
    @Min(1)
    @Max(7)
    @IsOptional()
    calificacion?: number

    @IsOptional()
    comentario?: string
}
