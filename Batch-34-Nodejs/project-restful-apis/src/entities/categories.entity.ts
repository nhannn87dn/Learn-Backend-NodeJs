import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'Categories'}) //Đặt tên cho table, nếu ko thì lấy = tên của class
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'nvarchar', length: 50, unique: true})
  name: string

  @Column({type: 'nvarchar', length: 500})
  description: string
}