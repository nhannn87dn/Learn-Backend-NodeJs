import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Category } from "./category.entity"

@Entity()
export class Product  {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'nvarchar', length: 100, unique: true })
    product_name: string

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number

    @Column({ type: 'decimal', precision: 4, scale: 2 })
    discount: number

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    description: string

    @Column({ type: 'int' })
    stock: number

    @Column({type: 'int'})
    model_year: number

    @Column({ type: 'nvarchar', length: 255, unique: true })
    slug: string

    @Column({type: 'varchar', nullable: true})
    thumbnail: string

    //RELATIONSHIP
    @ManyToOne(() => Category, (c) => c.products)
    category: Category;

}