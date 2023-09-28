import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Categories {
  @PrimaryColumn()
  CategoryID: number;

  @Column({ nullable: true })
  CategoryName: string;

  @Column({ nullable: true })
  Description: string;
}