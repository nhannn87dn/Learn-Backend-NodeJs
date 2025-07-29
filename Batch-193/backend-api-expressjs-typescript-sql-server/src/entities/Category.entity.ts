import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product.entity"
import { Length, validateOrReject } from "class-validator"
import createError from "http-errors";
//decorator

@Entity({
    name: 'categories' //đặt tên cho table vật lý
}) // hieu day la 1 table
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Length(3, 50)
    @Column({type: 'varchar',   length: 50, unique: true, nullable: false})
    category_name: string

    @Length(10, 500)
    @Column({type: 'varchar', length: 500, nullable: true, default: null})
    description: string

    @Column({type: 'varchar', length: 255, unique: true})
    slug: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

     //RELATIONS
    @OneToMany(() => Product, (p) => p.category)
    products: Product[]

    //middleware
    //validator
    @BeforeInsert() //Truoc khi them moi
    @BeforeUpdate() //truoc khi cap nhat
    async validate() {
        try {
            await validateOrReject(this);
          } catch (errors: any) {
            //console.log('Caught promise rejection (validation failed). Errors: ', errors);
            // Định dạng lỗi từ class-validator
                const formattedErrors = errors.map((error: any) => ({
                    property: error.property,
                    constraints: error.constraints,
                    value: error.value,
                }));

                // Ném lỗi với http-errors
                throw createError(400, 'Validation failed: '+formattedErrors[0].property + ' - '+ JSON.stringify(formattedErrors[0].constraints), {
                    errors: formattedErrors, // Gửi chi tiết lỗi
                });
        }
    }
}