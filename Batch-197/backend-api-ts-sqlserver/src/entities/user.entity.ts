import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name: 'users', //Tên bảng trong DB
})
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 100, name: 'first_name' })
    firstName!: string

    @Column({ type: 'varchar', length: 100 })
    lastName!: string

    @Column({ type: 'bit' })
    isActive!: boolean
}