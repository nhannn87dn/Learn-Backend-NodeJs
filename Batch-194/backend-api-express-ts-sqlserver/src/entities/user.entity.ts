import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// 
@Entity() //Để xác định đây là 1 entity
export class User {
    @PrimaryGeneratedColumn() //sinh ra khoá chính tự tăng
    id: number

    @Column() // 1 trường/ cột
    firstName: string

    @Column()
    lastName: string
}
