import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { IsNotEmpty, IsString, MaxLength, MinLength, IsOptional } from "class-validator"
import slugify from "slugify"
import { Product } from "./Product.entity"

@Entity({
    name: "categories"
})
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "nvarchar",
        length: 50,
        unique: true,
    })
    @IsNotEmpty({ message: "Category name is required" })
    @IsString()
    @MinLength(2, { message: "Category name must be at least 2 characters" })
    @MaxLength(50, { message: "Category name must be at most 50 characters" })
    categoryName!: string

    @Column({
        type: "nvarchar",
        length: 500,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "Description must be at most 500 characters" })
    description?: string | null

    @Column({
        type: "nvarchar",
        length: 50,
        unique: true,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    slug?: string | null

    // Relationships
    @OneToMany(() => Product, (product) => product.category)
    products!: Product[]

    // Auto-generate slug from categoryName before insert/update
    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (!this.slug && this.categoryName) {
            this.slug = slugify(this.categoryName, { lower: true, strict: true })
        }
    }
}
