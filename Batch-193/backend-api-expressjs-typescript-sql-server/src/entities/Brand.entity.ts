import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import {Product} from './Product.entity'

@Entity({
    name: 'brands' //đặt tên cho table vật lý
}) // hieu day la 1 table
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 50, unique: true, nullable: false})
    brand_name: string

    @Column({type: 'varchar', length: 500, nullable: true, default: null})
    description: string

    @Column({type: 'varchar', length: 255, unique: true})
    slug: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

     //RELATIONS
    @OneToMany(() => Product, (p) => p.brand)
    products: Product[]

}