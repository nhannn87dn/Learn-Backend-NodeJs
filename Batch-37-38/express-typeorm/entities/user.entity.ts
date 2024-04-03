import { BeforeInsert, BeforeUpdate,Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import {BaseField} from './abstractBaseField'
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
  

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string

    @Column()
    photo: string
}

@Entity({name: 'Users'})
export class User extends BaseField{
    @PrimaryGeneratedColumn()
    id: number
    //SQL: id int INDENTITY(1,1) PRIMARY KEY NOT NULL

    @Column()
    @Length(4, 20)
    firstName: string
    //firstName nvarchar

    @Column({length: 50, default: ''})
    lastName: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    //validator
    @BeforeInsert() //Truoc khi them moi
    @BeforeUpdate() //truoc khi cap nhat
    async validate() {
        try {
            await validateOrReject(this);
          } catch (errors) {
            console.log('Caught promise rejection (validation failed). Errors: ', errors);
          }
    }
}
