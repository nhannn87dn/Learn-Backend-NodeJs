import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Products {
  @PrimaryColumn()
  ProductID: number;

  @Column({ nullable: true })
  ProductName: string;

  @Column({ nullable: true })
  SupplierID: number;

  @Column({ nullable: true })
  CategoryID: number;

  @Column({ nullable: true })
  Unit: string;

  @Column({ nullable: true })
  Price: number;
}