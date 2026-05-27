import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Min,
    Max,
    IsPositive,
} from "class-validator"
import { Order } from "./Order.entity"
import { Product } from "./Product.entity"

@Entity({
    name: "order_items"
})
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Order is required" })
    @IsNumber()
    orderId!: number

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Product is required" })
    @IsNumber()
    productId!: number

    @Column({
        type: "smallint",
    })
    @IsNotEmpty({ message: "Quantity is required" })
    @IsNumber()
    @IsPositive({ message: "Quantity must be greater than 0" })
    quantity!: number

    @Column({
        type: "decimal",
        precision: 18,
        scale: 2,
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

    // Relationships
    @ManyToOne(() => Order, (order) => order.orderDetails, {
        onDelete: "CASCADE",
        eager: false,
    })
    @JoinColumn({ name: "orderId" })
    order!: Order

    @ManyToOne(() => Product, (product) => product.orderDetails, {
        onDelete: "CASCADE",
        eager: false,
    })
    @JoinColumn({ name: "productId" })
    product!: Product
}
