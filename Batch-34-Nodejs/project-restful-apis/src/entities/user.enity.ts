import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'Users'}) //Đặt tên cho table, nếu ko thì lấy = tên của class
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column("nvarchar", { length: 20 }) 
  firstName: string

  @Column("nvarchar", { length: 20 }) 
  lastName: string

  @Column()
  age: number
}