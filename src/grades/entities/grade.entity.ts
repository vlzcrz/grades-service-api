import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity()
export class Grade {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column()
    uuid_estudiante: string

    @Column()
    asignatura: string

    @Column()
    nombre_calificacion: string

    @Column('float')
    calificacion: number

    @Column()
    comentario: string

    constructor() {
        this.uuid_estudiante = uuid()
    }

    
}
