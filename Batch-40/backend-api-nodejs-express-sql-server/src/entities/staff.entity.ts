import { IsEmail, validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import createError from 'http-errors';

@Entity({name: 'staffs'}) //Tên bảng trong database
export class Staff {
    @PrimaryGeneratedColumn()
    staff_id: number

    @Column({
        length: 50
    })
    first_name: string

    @Column({
        length: 50
    })
    last_name: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    @IsEmail()
    email: string

    @Column({
        length: 255,
    })
    password: string

    @Column()
    active: boolean

    //validator
    @BeforeInsert() //Truoc khi them moi
    @BeforeUpdate() //truoc khi cap nhat
    async validate() {
        try {
            await validateOrReject(this);
          } catch (errors) {
            console.log('Caught promise rejection (validation failed). Errors: ', errors);
            throw createError(400, errors);
        }
    }
}