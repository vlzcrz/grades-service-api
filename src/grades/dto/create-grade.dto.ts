import { IsDecimal, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateGradeDto {
    
    @IsString()
    uuid_estudiante: string

    @IsString()
    asignatura: string

    @IsString()
    nombre_calificacion: string

    @IsNumber()
    @Min(1)
    @Max(7)
    calificacion: number

    @IsString()
    @IsOptional()
    comentario?: string

}
