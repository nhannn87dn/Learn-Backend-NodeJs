import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string
}