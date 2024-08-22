import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";
@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn({ type: "int" })
    category_id: number

    @Column({ type: "nvarchar", length: 50, unique: true })
    category_name: string
    //category_name NVARCHAR(50) UNIQUE NOT NULL

    @Column({ type: "nvarchar", length: 500, nullable: true })
    description: string
    //description NVARCHAR(250) NULL

    @Column({ type: "nvarchar", length: 50, unique: true })
    slug: string

    @Column({ type: "smallint", default: 50})
    order: number
    //order SMALLINT DEFAULT 50 NOT NULL

    @OneToMany(() => Product, (p) => p.category)
    products: Product[]

}