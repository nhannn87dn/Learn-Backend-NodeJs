import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity"

@Entity()
export class Category  {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'nvarchar', length: 50 })
    category_name: string

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    description: string

    @Column({ type: 'nvarchar', length: 255, unique: true })
    slug: string

    // Thêm các trường khác nếu cần
    // @UpdateDateColumn()
    // updateAt: Date;

    // @CreateDateColumn()
    // createAt: Date;

    //RELATIONSHOP
    @OneToMany(() => Product, (p) => p.category)
    products: Product[];

    
}