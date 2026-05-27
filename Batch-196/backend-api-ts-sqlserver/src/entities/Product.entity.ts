import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm"
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    MaxLength,
    MinLength,
    Min,
    Max,
    IsPositive,
} from "class-validator"
import slugify from "slugify"
import { Category } from "./Category.entity"
import { Brand } from "./Brand.entity"
import { OrderDetail } from "./OrderDetail.entity"

@Entity({
    name: "products"
})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "nvarchar",
        length: 255,
        unique: true,
    })
    @IsNotEmpty({ message: "Product name is required" })
    @IsString()
    @MinLength(2, { message: "Product name must be at least 2 characters" })
    @MaxLength(255, { message: "Product name must be at most 255 characters" })
    productName!: string

    @Column({
        type: "decimal",
        precision: 18,
        scale: 2,
        default: 0,
    })
    @IsNotEmpty({ message: "Price is required" })
    @IsNumber()
    @IsPositive({ message: "Price must be greater than 0" })
    price!: number

    @Column({
        type: "decimal",
        precision: 18,
        scale: 2,
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0, { message: "Discount must be at least 0" })
    @Max(70, { message: "Discount must be at most 70" })
    discount?: number

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Category is required" })
    @IsNumber()
    categoryId!: number

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Brand is required" })
    @IsNumber()
    brandId!: number

    @Column({
        type: "nvarchar",
        length: "MAX",
        nullable: true,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @Column({
        type: "smallint",
    })
    @IsNotEmpty({ message: "Model year is required" })
    @IsNumber()
    @Min(2000, { message: "Model year must be at least 2000" })
    modelYear!: number

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    slug?: string | null

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255, { message: "Thumbnail URL must be at most 255 characters" })
    thumbnail?: string | null

    @Column({
        type: "smallint",
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0, { message: "Stock must be at least 0" })
    stock?: number

    // Relationships
    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "categoryId" })
    category!: Category

    @ManyToOne(() => Brand, (brand) => brand.products, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "brandId" })
    brand!: Brand

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails!: OrderDetail[]

    // Auto-generate slug from productName before insert/update
    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (!this.slug && this.productName) {
            this.slug = slugify(this.productName, { lower: true, strict: true })
        }
    }
}
