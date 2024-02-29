import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, } from 'typeorm';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

@Entity({ name: 'Employees' }) //đặt tên table
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, type: 'nvarchar', nullable: false })
  firstName: string;

  @Column({ length: 20, type: 'nvarchar', nullable: false })
  lastName: string;

  @Column({ length: 120, nullable: false })
  numberPhone: string;

  @Column({ length: 50, nullable: false })
  @IsEmail()
  email: string;

  @Column({ length: 50, type: 'nvarchar', nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ length: 255, nullable: false })
  password: string;


  // HOOKS (AUTO VALIDATE)
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}
