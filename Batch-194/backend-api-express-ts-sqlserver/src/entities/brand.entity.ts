import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity"
//Đặt tên cho table trong DB là brans
@Entity({ name: 'brands' })
export class Brand  {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'nvarchar', length: 50 })
    brand_name: string

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
    @OneToMany(() => Product, (p) => p.brand)
    products: Product[];

    
}