import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Photo } from "./Photo.entity"
import { IsEmail, IsInt, Min, MinLength } from "class-validator"

@Entity({
    name: "users" //đặt tên bảng trong cơ sở dữ liệu là "users"
})
export class User {
    @PrimaryGeneratedColumn() //khoá chính tự động tăng
    id!: number

    @Column({
        type: "varchar", //kiểu dữ liệu chuỗi
        length: 255, //độ dài tối đa của chuỗi,
    })
    @MinLength(2, {
        message: "Name must be at least 2 characters long"
    }) //sử dụng class-validator để đảm bảo tên có độ dài tối thiểu là 2 ký tự
    name!: string

    @Column({
        type: "varchar",
        length: 255,
        unique: true, //đảm bảo giá trị email là duy nhất trong bảng
        transformer: {
            to: (value: string) => value.toLowerCase(),
            from: (value: string) => value
        }, //tự động chuyển email thành chữ thường khi lưu vào cơ sở dữ liệu
    })
    @IsEmail()
    email!: string

    @Column({
        type: "smallint",
    })
    @IsInt() //sử dụng class-validator để đảm bảo giá trị là số nguyên
    @Min(13, {
        message: "Age must be at least 13 years old"
    }) //sử dụng class-validator để đảm bảo tuổi phải lớn hơn hoặc bằng 13
    age!: number

    // Quan hệ một-nhiều với bảng Photo
    @OneToMany(() => Photo, (photo) => photo.user)
    photos!: Photo[]
}