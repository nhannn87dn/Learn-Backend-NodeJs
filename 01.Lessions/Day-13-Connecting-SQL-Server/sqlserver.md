
# Type ORM

## 💛 Entities là gì


Trong TypeORM, một "entity" (thực thể) đại diện cho một đối tượng trong cơ sở dữ liệu. Mỗi entity tương ứng với một bảng trong cơ sở dữ liệu và các trường của entity tương ứng với các cột trong bảng đó. TypeORM sử dụng các đối tượng entity để thực hiện các thao tác thêm, sửa, xóa và truy vấn dữ liệu.

Nói một cách dễ hiểu để tạo được một `table` theo mô hình code-first bạn cần tạo một `Entity`.

Giống như cách bạn đang sử dụng lệnh CREATE TABLE, sau đó liệt kê các trường cần tạo cho table vậy.

### 🚩 Cách Tạo một Entity

Chi tiết: https://typeorm.io/entities


```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'Users'}) //==> Đặt tên table, nếu ko thì nó lấy = tên của Class bên dưới
export class User {
    @PrimaryGeneratedColumn() //Tự tạo ID, từ khóa chính, ID tăng giần
    id: number

    @Column("nvarchar", { length: 20 }) // DataType cho trường fistName
    firstName: string

    @Column("nvarchar", { length: 20 })
    lastName: string

    @Column()
    isActive: boolean
}
```

TypeORM sẽ tự động tạo table `Users` nếu nó chưa tồn tại, tương đương với bảng dữ liệu sau:

```text
+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| firstName   | varchar(255) |                            |
| lastName    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+
```

Ánh xạ qua các bước để tạo một `table` bạn cần biết thêm:

- Cách tạo khóa chính
- Cách tạo khóa ngoại
- Biết cách dùng kiểu dữ liệu
- Biết cách cấu hình constrains

Khi thao tác với Type ORM


### 🚩 Kiểu dữ liệu SQL Server trong Type ORM

Chi tiết xem:  https://typeorm.io/entities#column-types-for-mssql

Dưới đây là danh sách các kiểu dữ liệu trong SQL Server  trong Type ORM hỗ trợ:

`int`, `bigint`, `bit`, `decimal`, `money`, `numeric`, `smallint`, `smallmoney`, `tinyint`, `float`, `real`, `date`, `datetime2`, `datetime`, `datetimeoffset`, `smalldatetime`, `time`, `char`, `varchar`, `text`, `nchar`, `nvarchar`, `ntext`, `binary`, `image`, `varbinary`, `hierarchyid`, `sql_variant`, `timestamp`, `uniqueidentifier`, `xml`, `geometry`, `geography`, `rowversion`


Cách dùng


```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export type UserRoleType = "admin" | "editor" | "ghost",

@Entity({name: 'EnityName'}) //==> Đặt tên table, nếu ko thì nó lấy = tên của Class bên dưới
export class User {
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
    //SQL: firstName navarchar(20) not null

    @Column({ type: "smallint" })
    age: number
   //SQL: age smallint not null

    @Column({type: 'bit'})
    isActive: boolean
    //SQL: isActive boolean not null

    @Column({
        type: "enum",
        enum: ["admin", "editor", "ghost"],
        default: "ghost",
        nullable: false,
    })
    role: UserRoleType
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
```

- Cách tạo Trường Khóa chính: https://typeorm.io/entities#primary-columns
- Danh sách các Option cho trường: https://typeorm.io/entities#column-options

### 🚩 Tính kế thừa của Entities

Vì Entity được tạo bằng Class, do vậy nó có đặc tính kế thửa của Class.

```ts
/**
 * Lớp abstract
 * chứa các Field cơ bản
 */
export abstract class BaseField {
    
    @Column({type: 'bit'})
    isActive: boolean

    @Column({type: 'bit'})
    isDelete: boolean

    @Column({type: 'smallint'})
    sortOrder: number
}
/**
 * Lớp Product
 * kế thừa những fields cơ bản từ BaseField
 * và bổ sung các field của riêng nó
 */
@Entity()
export class Product extends BaseField {
    @Column()
    name: string
}
```

### 🚩 Entity Schema

Ngoài cách bạn định nghĩa Enity với decorators, chúng ta còn có thể định nghĩa với một khái niệm gọi là `entity schemas` trong TypeORM

Chi tiết xem: https://typeorm.io/separating-entity-definition

```ts
import { EntitySchema } from "typeorm"


export const PersonSchema = new EntitySchema({
    name: "person",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
        firstName: {
            type: String,
            length: 30,
        },
        lastName: {
            type: String,
            length: 50,
            nullable: false,
        },
        age: {
            type: Number,
            nullable: false,
        },
    },
    checks: [
        { expression: `"firstName" <> 'John' AND "lastName" <> 'Doe'` },
        { expression: `"age" > 18` },
    ],
    indices: [
        {
            name: "IDX_TEST",
            unique: true,
            columns: ["firstName", "lastName"],
        },
    ],
    uniques: [
        {
            name: "UNIQUE_TEST",
            columns: ["firstName", "lastName"],
        },
    ],
})
```

Giúp bạn cảm thấy dễ chịu và gần gủi hơn như cách đã làm với MongoDB

## 💛 Relations - Các kiểu quan hệ

Xây dựng mối quan hệ giữa các Entities trong TypeORM


### 🔸 One-to-one

Chi tiết: https://typeorm.io/one-to-one-relations


```ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string

    @Column()
    photo: string
}

/**
 * Enity User có quan hệ ONE-to-ONE
 * với Profile
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile
}

```

Thông thường với kiểu quan hệ này, bạn sử dụng để mở rộng các trường cho một table, khi table đó quá lớn, không thể tạo thêm trường cho nó. 

Khi đó bạn tạo một bảng mới,  mở rộng thông tin cho bảng cũ theo quan hệ 1-1.

### 🔸 Many-to-one / one-to-many

Chi tiết: https://typeorm.io/many-to-one-one-to-many-relations

Ví dụ:

```ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'Categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name', unique: true, length: 50 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}
```

Mục đích bạn thiết lập như vậy là để ORM truy vấn thông tin dựa trên mối quan hệ từ vế đang đứng.

### 🔸 Many-to-many

Chi tiết: https://typeorm.io/many-to-many-relations


Ví dụ:

```ts
import { Column, Entity, ManyToOne, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { OrderDetail } from './order-details.entity';

@Entity({ name: 'Products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name', type: 'nvarchar', length: 100 })
  name: string;

  @Column({ name: 'Price', type: 'decimal', precision: 18, scale: 2 })
  price: number;

 
  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'int' })
  brandId: number;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @ManyToOne(() => Category, (c) => c.products)
  category: Category;

  @ManyToOne(() => Supplier, (s) => s.products)
  supplier: Supplier;

  @OneToMany(() => OrderDetail, (od) => od.product)
  orderDetails: OrderDetail[];
}

```

Mục đích bạn thiết lập như vậy là để ORM truy vấn thông tin dựa trên mối quan hệ từ vế đang đứng.


## 💛 Validation

Tạo sự ràng buộc chặt chẻ dữ liệu hơn với `class-validator`

Cài đặt:

```bash
yarn add class-validator
```

Sử dụng


```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from "class-validator"

@Entity()
export class MyEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'nvarchar',
    })
    //Ràng buộc độ dài
    @Length(10, 20)
    title: string


    @Column()
    //Chứa từ 'hello'
    @Contains("hello")
    text: string

    @Column()
    //Kiểu số, giá trị từ 0-19
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number

    @Column()
    //Đúng định dạng email
    @IsEmail()
    email: string

    @Column()
    //Phải là kiểu ngày
    @IsDate()
    createDate: Date

}
```

Xem đầy đủ tại: https://github.com/typestack/class-validator



## 💛 HOMEWORKS - Tạo các Entities với TypeORM

Làm tuần tự lần lượt các Entities, và thiết lập quan hệ cho chúng

1. Staff
2. Customer
3. Category
4. Brand
5. Product
6. Order
7. OrderDetails

Cấu trúc các bảng xem tại `Homeworks\Database-Structure`