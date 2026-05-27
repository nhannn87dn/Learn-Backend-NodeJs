import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { IsNotEmpty, IsString, MaxLength, MinLength, IsOptional } from "class-validator"
import slugify from "slugify"
import { Product } from "./Product.entity"

@Entity({
    name: "brands"
})
export class Brand {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "nvarchar",
        length: 100,
        unique: true,
    })
    @IsNotEmpty({ message: "Brand name is required" })
    @IsString()
    @MinLength(2, { message: "Brand name must be at least 2 characters" })
    @MaxLength(100, { message: "Brand name must be at most 100 characters" })
    brandName!: string

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
        length: 100,
        unique: true,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    slug?: string | null

    // Relationships
    @OneToMany(() => Product, (product) => product.brand)
    products!: Product[]

    // Auto-generate slug from brandName before insert/update
    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (!this.slug && this.brandName) {
            this.slug = slugify(this.brandName, { lower: true, strict: true })
        }
    }
}
