import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Employees {
  @PrimaryColumn()
  EmployeeID: number;

  @Column({ nullable: true })
  LastName: string;

  @Column({ nullable: true })
  FirstName: string;

  @Column({ nullable: true })
  BirthDate: Date;

  @Column({ nullable: true })
  Photo: string;

  @Column({ type: "nvarchar", nullable: true,  length: "max" })
  Notes: string;

  @Column({ length: 120 })
  NumberPhone: string;

  @Column({ length: 50 })
  Email: string;

  @Column({ length: 255 })
  Password: string;
}