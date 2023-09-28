import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Customers {
  @PrimaryColumn()
  CustomerID: number;

  @Column({ nullable: true })
  CustomerName: string;

  @Column({ nullable: true })
  ContactName: string;

  @Column({ nullable: true })
  Address: string;

  @Column({ nullable: true })
  City: string;

  @Column({ nullable: true })
  PostalCode: string;

  @Column({ nullable: true })
  Country: string;
}