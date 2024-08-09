import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm"

export type UserRoleType = "admin" | "editor" | "ghost"

@Entity({name: 'EnityName'}) //==> Đặt tên table, nếu ko thì nó lấy = tên của Class bên dưới
export class Test {
    //Tự tạo ID, từ khóa chính, ID tăng giần
    @PrimaryGeneratedColumn() 
    id: number
    //id int INDENTITY(1,1) PRIMARY KEY NOT NULL

    @Column({
        name: 'Name', //Đặt tên cho trường
        type: "nvarchar",
        length: 20,
        nullable: false,  // default is false
    }) 
    name: string
    //SQL: Name navarchar(20) not null

    @Column({ type: "smallint" })
    age: number
   //SQL: age smallint not null

    @Column({type: 'bit'})
    isActive: boolean
    //SQL: isActive bit not null

    @Column({
        type: "nvarchar",
        default: "ghost",
        nullable: false,
    })
    role: string
    //SQL: role varchar(10) default 'ghost' not null

    @Column()
    @Generated("uuid")
    uuid: string

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
    })
    email: string;
    //SQL: email varchar(150) unique not null

    @Column({
        type: "ntext",
        nullable: true,
    })
    description: string;
    //SQL: description ntext null

    @Column({
        type: 'decimal', 
        precision: 18, // độ dài 18 digits
        scale: 2, // với 2 số thập phân
        default: 0,
    })
    price: number;
    //SQL: price decimal(18,2) default 0 not null

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP' 
    })
    createdDate: Date;
    //SQL: createdDate datetime default CURRENT_TIMESTAMP not null

}