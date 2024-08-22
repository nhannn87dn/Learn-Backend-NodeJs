import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";
@Entity({name: 'brands'})
export class Brand {
    @PrimaryGeneratedColumn({ type: "int" })
    brand_id: number

    @Column({ type: "nvarchar", length: 50, unique: true })
    brand_name: string
    //brand_name NVARCHAR(50) UNIQUE NOT NULL

    @Column({ type: "nvarchar", length: 500, nullable: true })
    description: string
    //description NVARCHAR(250) NULL

    @Column({ type: "nvarchar", length: 50, unique: true })
    slug: string

    @Column({ type: "smallint", default: 50})
    order: number
    //order SMALLINT DEFAULT 50 NOT NULL

    @OneToMany(() => Product, (p) => p.brand)
    products: Product[]

}