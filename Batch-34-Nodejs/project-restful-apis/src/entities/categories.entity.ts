import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from "typeorm"
import { Product } from "./products.entity"
@Entity({name: 'Categories'}) //Đặt tên cho table, nếu ko thì lấy = tên của class
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'nvarchar', length: 50, unique: true})
  name: string

  @Column({type: 'nvarchar', length: 500})
  description: string

  // ----------------------------------------------------------------------------------------------
  // RELATIONS 1-n
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}