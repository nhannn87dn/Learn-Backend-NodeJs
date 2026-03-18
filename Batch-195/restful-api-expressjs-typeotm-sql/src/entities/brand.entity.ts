import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity"

@Entity({
    name: 'brands' //Tên bảng trong database
}) //một decorator typescript
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    //Cứ mỗi cột trong database sẽ được khai báo 
    // là một property trong class và 
    // được đánh dấu bằng @Column() decorator
    @Column({
        type: 'varchar', //Kiểu dữ liệu của cột trong database
        length: 50, //Độ dài tối đa của chuỗi
        unique: true, //Giá trị phải là duy nhất trong bảng
    })
    brand_name: string

    @Column({
        type: 'varchar', //Kiểu dữ liệu của cột trong database
        length: 256, //Độ dài tối đa của chuỗi
        nullable: true, //Cho phép giá trị null
    })
    description: string

    @Column({
        type: 'varchar',
        length: 165,
        unique: true
    })
    slug: string

    //relation with product
    @OneToMany(() => Product, (p) => p.brand)
    products: Product[];
}
