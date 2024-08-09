import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number

    @Column()
    category_name: string

    @Column()
    description: string

    @Column()
    slug: string

    @Column()
    order: number
}