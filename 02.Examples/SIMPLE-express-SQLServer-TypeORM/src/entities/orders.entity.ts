import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Orders {
  @PrimaryColumn()
  OrderID: number;

  @Column({ nullable: true })
  CustomerID: number;

  @Column({ nullable: true })
  EmployeeID: number;

  @Column({ nullable: true })
  OrderDate: Date;

  @Column({ nullable: true })
  ShipperID: number;
}