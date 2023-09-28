import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Shippers {
  @PrimaryColumn()
  ShipperID: number;

  @Column({ nullable: true })
  ShipperName: string;

  @Column({ nullable: true })
  Phone: string;
}