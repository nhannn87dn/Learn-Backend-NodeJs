import { Length, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm"
import createError from 'http-errors';
import { Product } from "./product.entity";

@Entity({name: 'brands'}) //Tên bảng trong database
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id: number

    @Length(3, 50) //validator
    @Column({
        length: 50,
        unique: true
    })
    brand_name: string

    @Length(3, 50) //validator
    @Column({
        length: 50,
        unique: true,
        type: 'varchar',
    })
    slug: string

    @Column({
        length: 255,
        nullable: true
    })
    description: string


    //RELATIONS
     @OneToMany(() => Product, (p) => p.category)
    products: Product[]

    //validator
    @BeforeInsert() //Truoc khi them moi
    @BeforeUpdate() //truoc khi cap nhat
    async validate() {
        try {
            await validateOrReject(this);
          } catch (errors) {
            console.log('Caught promise rejection (validation failed). Errors: ', errors);
            throw createError(400, errors);
        }
    }
}