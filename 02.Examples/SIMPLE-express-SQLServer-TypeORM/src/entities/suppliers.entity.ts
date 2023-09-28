import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Suppliers {
  @PrimaryColumn()
  SupplierID: number;

  @Column({ nullable: true })
  SupplierName: string;

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

  @Column({ nullable: true })
  Phone: string;
}