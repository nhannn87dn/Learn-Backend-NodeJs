import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { Category } from "./category.entity";
import {Min, Max, validateOrReject} from 'class-validator'

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn({ type: "int" })
    product_id: number

    @Column({ type: "nvarchar", length: 255, unique: true })
    product_name: string
    //product_name NVARCHAR(255) UNIQUE NOT NULL

    @Column({ type: "nvarchar", length: 'max', nullable: true, default: null })
    description: string
    //description NVARCHAR(MAX) NULL DEFAULT NULL

    @Column({ type: "nvarchar", length: 255, unique: true })
    slug: string

    @Column({ type: "smallint", default: 50})
    order: number
    //order SMALLINT DEFAULT 50 NOT NULL

    @Column({ type: "decimal", default: 0, precision: 18, scale: 2})
    price: number
    //price DECIMAL(18,2) DEFAULT 0 NOT NULL

    @Column({ type: "decimal", default: 0, precision: 18, scale: 2})
    //CONSTRAINT discount > 0 and discount < 70
    @Min(0)
    @Max(70)
    discount: number
    //discount DECIMAL(18,2) DEFAULT 0 NOT NULL

    @Column({ type: "smallint"})
    model_year: number

    @Column({ type: "smallint", default: 0})
    stock: number


    @Column({ type: "nvarchar", length: 255, default: null, nullable: true })
    thumbnail: string
    //thumbnail nvarchar(255) null default NULL

    //Cấu hình khóa ngoại giữa product với category
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    //validator
    @BeforeInsert() //Truoc khi them moi
    @BeforeUpdate() //truoc khi cap nhat
    async validate() {
        try {
            await validateOrReject(this);
          } catch (errors) {
            console.log('Caught promise rejection (validation failed). Errors: ', errors);
          }
    }
}