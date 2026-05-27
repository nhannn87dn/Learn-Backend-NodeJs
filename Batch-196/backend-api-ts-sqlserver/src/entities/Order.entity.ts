import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
} from "typeorm"
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsInt,
    Min,
    Max,
    IsDateString,
    MaxLength,
} from "class-validator"
import { OrderDetail } from "./OrderDetail.entity"

export enum OrderStatus {
    PENDING = 1,
    PROCESSING = 2,
    REJECTED = 3,
    COMPLETED = 4,
}

export enum PaymentType {
    COD = 1,
    CREDIT = 2,
    ATM = 3,
    CASH = 4,
}

@Entity({
    name: "orders"
})
export class Order {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Customer is required" })
    @IsNumber()
    customerId!: number

    @Column({
        type: "tinyint",
        default: OrderStatus.PENDING,
    })
    @IsOptional()
    @IsInt()
    @Min(1, { message: "Order status must be between 1 and 4" })
    @Max(4, { message: "Order status must be between 1 and 4" })
    orderStatus?: number

    @CreateDateColumn({
        type: "datetime",
    })
    orderDate!: Date

    @Column({
        type: "datetime",
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    requireDate?: Date | null

    @Column({
        type: "datetime",
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    shippingDate?: Date | null

    @Column({
        type: "int",
    })
    @IsNotEmpty({ message: "Staff is required" })
    @IsNumber()
    staffId!: number

    @Column({
        type: "nvarchar",
        length: "MAX",
        nullable: true,
    })
    @IsOptional()
    @IsString()
    orderNote?: string | null

    @Column({
        type: "nvarchar",
        length: 255,
    })
    @IsNotEmpty({ message: "Street is required" })
    @IsString()
    @MaxLength(255, { message: "Street must be at most 255 characters" })
    street!: string

    @Column({
        type: "nvarchar",
        length: 50,
    })
    @IsNotEmpty({ message: "City is required" })
    @IsString()
    @MaxLength(50, { message: "City must be at most 50 characters" })
    city!: string

    @Column({
        type: "nvarchar",
        length: 50,
    })
    @IsNotEmpty({ message: "State is required" })
    @IsString()
    @MaxLength(50, { message: "State must be at most 50 characters" })
    state!: string

    @Column({
        type: "tinyint",
        default: PaymentType.COD,
    })
    @IsOptional()
    @IsInt()
    @Min(1, { message: "Payment type must be between 1 and 4" })
    @Max(4, { message: "Payment type must be between 1 and 4" })
    paymentType?: number

    // Relationships
    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
        cascade: true,
        eager: false,
    })
    orderDetails!: OrderDetail[]
}
