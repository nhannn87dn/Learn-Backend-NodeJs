import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm"
import { Category } from "./category.entity"
import { IsInt, Max, Min, validateOrReject } from "class-validator"
import { Brand } from "./brand.entity"

@Entity({
    name: 'products' //Tên bảng trong database
}) //một decorator typescript
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar', //Kiểu dữ liệu của cột trong database
        length: 100, //Độ dài tối đa của chuỗi
        unique: true, //Giá trị phải là duy nhất trong bảng
    })
    product_name: string

    @Column({
        type: 'varchar', //Kiểu dữ liệu của cột trong database
        length: 256, //Độ dài tối đa của chuỗi
        nullable: true, //Cho phép giá trị null
    })
    description: string

    @IsInt()
    @Min(0)
    @Column({
        type: 'decimal', //Kiểu dữ liệu số thập phân
        precision: 10, //Tổng số chữ số
        scale: 2, //Số chữ số sau dấu thập phân
    })
    price: number

    @IsInt()
    @Min(0)
    @Max(70)
    @Column({
        type: 'decimal', //Kiểu dữ liệu số thập phân
        precision: 4, //Tổng số chữ số
        scale: 2, //Số chữ số sau dấu thập phân
    })
    discount: number


    @Column({
        type: 'varchar',
        length: 165,
        unique: true
    })
    slug: string


    @Column({
        type: 'int',
        nullable: false,
    })
    model_year: number


    @Column({
        type: 'int',
        nullable: false,
        default: 0, //Giá trị mặc định nếu không cung cấp
    })
    stock: number


    @Column({
        type: 'varchar',
        name: 'thumbnail',
        length: 255,
        nullable: true,//allow null value
    })
    thumbnail: string


    //relation with category
   @ManyToOne(() => Category, (c) => c.products)
   category: Category;

   @ManyToOne(() => Brand, (b) => b.products)
   brand: Brand;


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