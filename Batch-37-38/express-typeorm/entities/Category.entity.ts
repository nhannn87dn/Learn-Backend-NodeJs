import { IsNotEmpty, Length, MaxLength, ValidateIf, validate, validateOrReject } from 'class-validator';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product.entity';

@Entity({ name: 'Categories' }) //Đặt tên cho Table
export class Category  {
  @PrimaryGeneratedColumn({ name: 'Id' }) //Từ khóa chính, tự động tăng
  id: number;

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 100, { message: '[$property] of [$target]: [$value] must be greater than $constraint1 and less than $constraint2 characters' })
  @Column({ name: 'Name', unique: true, type: 'nvarchar', length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', type: 'nvarchar', length: 500, nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];

  // HOOKS (AUTO VALIDATE)
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    //await validateOrReject(this);
    try {
      await validateOrReject(this);
    } catch (errors) {
      console.log('Caught promise rejection (validation failed). Errors: ', errors);
    }
  
  }
}
