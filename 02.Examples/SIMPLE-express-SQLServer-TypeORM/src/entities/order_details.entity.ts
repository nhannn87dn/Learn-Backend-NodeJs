import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class OrderDetails {
  @PrimaryColumn()
  OrderDetailID: number;

  @Column({ nullable: true })
  OrderID: number;

  @Column({ nullable: true })
  ProductID: number;

  @Column({ nullable: true })
  Quantity: number;
}