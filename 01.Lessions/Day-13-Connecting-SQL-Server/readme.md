# Express with SQL Server

## 💛 Cấu hình SQL Server

### Bước 1 - Chuyển chế độ đăng nhập

- Đăng nhập với chế độ Windown Authentication
- Sau đó kích phải lên tên Instance kết nối, chọn Properties

![sql](img/sql-1.png)

- Sau đó chọn Menu Security, rồi thực hiện chọn như hình dưới

![sql](img/sql-2.png)


### Bước 2 - Tạo Database

- Đăng nhập với chế độ Windown Authentication
- Click phải lên Databases --> chọn New Database
- Đặt tên sau đó nhấn OK

###  Bước 3 - Tạo tài khoản SQL Server - Authentication

- Đăng nhập với chế độ Windown Authentication
- Sau đó xổ Mục Security ra --> Click phải lên mục Login --> chọn New Login

![sql](img/sql-3.png)

- Tại tab General điền tên user vào ô Login name, điền password, confirm passowrd vào, rồi tick bỏ chọn Enfoce password policy

- Làm như hình dưới

![sql](img/sql-4.png)

- Tab User Mapping, chọn tên Database bạn muốn add user này vào quản trị
- Sau đó bên dưới bạn chọn db_owner
- Cuối cùng click OK 

![sql](img/sql-5.png)


###  Bước 4 - Bật  TCP/IP

- Vào Sql Server Configruration Manager

![sql](img/sql-6.png)

- Tại mục SQL Server Network Configruration --> chọn Protocals for MSSQLSERVER
- Tại cửa sổ bên phải: Click phải lên TCP/IP --> Enable

- Sau đó click phải lên TCP/IP --> Properties
![sql](img/sql-7.png)

Chọn qua tab IP Address --> Tìm đến dòng cuối cùng mục IPAll --> Sửa TCPT Port thành 1433


## 💛 Connecting to SQL Server 

Học cách kết nối với Database để lấy dữ liệu sau đó trả về cho Clients
### 🔶 Kết nối với SQL Server với ORM Tools

#### 🌻 ORM là gì ?

ORM viết tắt của "Object-Relational Mapping", là một mô hình lập trình được sử dụng để ánh xạ dữ liệu giữa hệ quản trị cơ sở dữ liệu (Relational Database Management System - RDBMS) và các đối tượng trong các ngôn ngữ lập trình hướng đối tượng (như Java, Python, C#, TypeScript, và nhiều ngôn ngữ khác). Mục tiêu chính của ORM là giúp đơn giản hóa việc làm việc với cơ sở dữ liệu bằng cách biến đổi dữ liệu được lưu trữ trong các bảng cơ sở dữ liệu thành các đối tượng có thể được truy cập và quản lý bằng mã lập trình.

Có rất nhiều Tools ORM: Sequelize, Prisma, TypeORM ...hỗ trợ javascript và TypeScript

---

## 💛 SQL Server with TypeORM library

TypeORM là một Object-Relational Mapper (ORM) cho TypeScript và JavaScript (ES7, ES6, ES5). Nó giúp bạn tạo ra các đối tượng và cơ sở dữ liệu chung, tạo và thực thi truy vấn.

MSSQL (Microsoft SQL Server) là một hệ thống quản lý cơ sở dữ liệu phổ biến của Microsoft.

### Cài đặt nhanh:

```bash
npx typeorm init --name express-sqlserver --database mssql --express
```
Công cụ sẽ tạo cho bạn một project với code mẫu.


### Cài đặt thủ công với Express

Xem bài viết: https://typeorm.io/example-with-express

**Bước 1**

Tạo một thư mục dự án mới `express-sqlserver` sau đó bạn mở nó trong Terminal và đánh lệnh

```bash
yarn init -y
```
**Bước 2**

Cài đặt typescript

```bash
yarn add -D typescript ts-node-dev
```

Sau đó tạo file `tsconfig.json` và copy nội dung này vào:

```json
{
    "compilerOptions": {
        "lib": ["es5", "es6", "dom"],
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
}
```

**Bước 3**

Tạo file `app.ts`

```ts
console.log('Hello Application')
```

**Bước 4**

Cấu hình script tại file `package.json`

```json
 "scripts": {
    "dev": "ts-node-dev app.ts"
  },
```

**Bước 5**

Cài express vào dự án


```bash
yarn add express
yarn add -D @types/express
```

Sau đó thay nội dung cho file `app.ts` thành như sau

```ts
import * as express from "express"
import { Request, Response } from "express"

// create and setup express app
const app = express()
app.use(express.json())

// register routes

app.get("/users", function (req: Request, res: Response) {
    // here we will have logic to return all users
})

app.get("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to return user by id
})

app.post("/users", function (req: Request, res: Response) {
    // here we will have logic to save a user
})

app.put("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
})

// start express server
app.listen(3000, ()=> {
  console.log('Connect server successful');
})
```


**Bước 6**

Cài TypeORM vào ứng dụng

```bash
yarn add typeorm mssql reflect-metadata
```

**Bước 7**

Tạo file `data-soucre.ts` để cấu hình kết nối

```ts
import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql',
  host: 'NHAN2',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'ExpressSQLServer34',
  entities: ['entities/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  options: {
    encrypt: false,
  },
});
```

**Bước 8** 

Tạo Các Model - Entities

Trong thư mục src tạo folder `entities` chứa tất cả Entity (Model)

Tạo một file Entity `src/entities/user.entity.ts`

Chi tiết xem: https://typeorm.io/#create-an-entity

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string
}

```

Sau khi kết nối hệ thống sẽ tự động tạo ra trong Database của bạn một table có tên `user`


**Bước 9** 

 Kết nối myDataSource vào server Express

bạn sửa code app.ts thành như sau:

```ts
import * as express from "express"
import { Request, Response } from "express"
import { User } from "./entities/user.entity"
import { myDataSource } from "./data-source"

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id),
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id),
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// start express server
app.listen(3000, ()=> {
  console.log('Connect server successful');
})
```

**Bước 10**

Chạy thử

```bash
yarn dev
```

Nếu thành công bạn sẽ thấy log 

```bash
Data Source has been initialized!
Connect server successful

```

Nễu lỗi và cách Fix:

- ConnectionError: Failed to connect to XXX:1433 - getaddrinfo ==> Lỗi này do thông số Host bị sai
- Error during Data Source initialization: ConnectionError: Failed to connect to XXX:1433 - self-signed certificate ==> Lỗi này cho đang bật SSL trên localhost

Thêm thông số này vào `data-source.ts`

```ts
options: {
    encrypt: false,
  },
```

- originalError: ConnectionError: Login failed for user 'xxx' ==> Kiểm tra lại user đó có được cấp quyền cho database không? Rà soát lại thông tin user, password...

==> TEST CÁC APIs

## 💛 Entities là gì


Trong TypeORM, một "entity" (thực thể) đại diện cho một đối tượng trong cơ sở dữ liệu. Mỗi entity tương ứng với một bảng trong cơ sở dữ liệu và các trường của entity tương ứng với các cột trong bảng đó. TypeORM sử dụng các đối tượng entity để thực hiện các thao tác thêm, sửa, xóa và truy vấn dữ liệu.

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

TypeORM sẽ tự động tạo table `Users` nếu nó chưa tồn tại

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

- Cách tạo Trường Khóa chính: https://typeorm.io/entities#primary-columns
- Kiểu dữ liệu cho trường: https://typeorm.io/entities#column-types
- Danh sách các Option cho trường: https://typeorm.io/entities#column-options

### 🚩 Embedded Entities

Trong TypeORM, "Embedded Entities" là một khái niệm cho phép nhúng (embed) một entity vào trong một entity khác. Điều này cho phép bạn tạo ra một mối quan hệ mạnh mẽ giữa các đối tượng và lưu trữ dữ liệu liên quan trong cùng một bảng hoặc cùng một cột trong cơ sở dữ liệu.

```ts
import { Entity, Column, PrimaryGeneratedColumn, Embedded } from 'typeorm';

@Embedded() //Nếu không đặt tên, thì tên = Class
export class Address {
  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //Address được lồng vào User
  @Embedded(() => Address)
  address: Address;
}
```

Chi tiết: https://typeorm.io/embedded-entities


### 🚩 Entity Inheritance

Entity Inheritance trong TypeORM cho phép bạn tạo ra mối quan hệ kế thừa giữa các entity

TypeORM cung cấp hai loại kế thừa trong entity: Single Table Inheritance (STI) và Class Table Inheritance (CTI)

Chi tiết: https://typeorm.io/entity-inheritance

### 🚩 Tree Entities

Trong TypeORM, "Tree Entities" là một tính năng cho phép bạn làm việc với các mô hình dữ liệu cây, nơi các đối tượng được tổ chức theo cấu trúc cây hierarchically. Các Tree Entities cho phép bạn thực hiện các thao tác như tạo, đọc, cập nhật và xóa các node trong cây một cách dễ dàng.

Chi tiết: https://typeorm.io/tree-entities

### 🚩 View Entities

Trong TypeORM, "View Entities" là một tính năng cho phép bạn định nghĩa và làm việc với các đối tượng ảo (views) trong cơ sở dữ liệu. Các View Entities trong TypeORM cho phép bạn tạo ra một cái nhìn (view) ảo của dữ liệu từ các bảng hoặc các truy vấn phức tạp khác.

Chi tiết: https://typeorm.io/view-entities

---

IMPORTANT

Ngoài cách bạn định nghĩa Enity với decorators, chúng ta còn có thể định nghĩa với một khái niệm gọi là `entity schemas` trong TypeORM

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

Sử dụng Schemas để truy vấn, thêm mới data

```ts
// request data
const personRepository = dataSource.getRepository<PersonType>(PersonSchema)
const person = await personRepository.findOneBy({
    id: 1,
}) // person is properly typed!

// insert a new person into the database
const personDTO = {
    // note that the ID is autogenerated; see the schema above
    name: "new person",
}
const newPerson = await personRepository.save(personDTO)
```

Chi tiết: https://typeorm.io/separating-entity-definition

---

## 💛 DataSource API

Các thông số cấu hình kết kết TypeORM vào dự án

Chi tiết: https://typeorm.io/data-source-api



---

## 💛 Relations - Các kiểu quan hệ

Bạn cần nắm được đối với từng kiểu quan hệ thì chúng ta cần cấu hình các entities nhưu thế nào.

### 🔸 One-to-one

Chi tiết: https://typeorm.io/one-to-one-relations


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

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Name', unique: true, length: 50 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', length: 500, nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}
```

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

  // ----------------------------------------------------------------------------------------------
  // NAME
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Name', type: 'nvarchar', length: 100 })
  name: string;

  // ----------------------------------------------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Price', type: 'decimal', precision: 18, scale: 2 })
  price: number;

  // ----------------------------------------------------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 })
  discount: number;

  // ----------------------------------------------------------------------------------------------
  // STOCK
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Stock', type: 'decimal', precision: 18, scale: 2, default: 0 })
  stock: number;

  // ----------------------------------------------------------------------------------------------
  // DESCRIPTION
  // ----------------------------------------------------------------------------------------------
  @Column({ name: 'Description', type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;

  // ----------------------------------------------------------------------------------------------
  // CATEGORY ID
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'int' })
  categoryId: number;

  // ----------------------------------------------------------------------------------------------
  // SUPPLIER ID
  // ----------------------------------------------------------------------------------------------
  @Column({ type: 'int' })
  supplierId: number;

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


---

## 💛 Entity Manager and Repository

### 🔸 Entity Manager

Bạn có thể : insert, update, delete, load, etc. với Entity Manager

```ts
import { AppDataSource } from "../../data-soucre.ts"
import { User } from "./entities/User"

//manager chính là EntityManager 
const user = await myDataSource.manager.findOneBy(User, {
    id: 1,
});
```


Chi tiết các lệnh với `EntityManager`: https://typeorm.io/entity-manager-api


### 🔸 Repository

Nó giống như Entity Manager nhưng nó bị giới hạn tại một enity cụ thể



```ts
import { AppDataSource } from "../../data-soucre.ts"
import { User } from "./entities/User";

//bị giới hạn tại một enity cụ thể ==> tức là bạn đang thao tác trên enity User đã cấu hình ngay từ đầu.

const userRepository = AppDataSource.getRepository(User)
const user = await userRepository.findOneBy({
    id: 1,
});
```
Chi tiết các lệnh với `Repository`: https://typeorm.io/repository-api


Về cơ bản cả `EntityManager` và `Repository` có cách sử dụng tương đồng nhau

#### 💡 Câu lênh SELECT

```ts
userRepository.find({
    select: {
        firstName: true,
        lastName: true,
    },
})
//SELECT "firstName", "lastName" FROM "user"
```


Lấy tất cả * dựa vào một hoặc nhiều điều kiện

```ts
userRepository.findBy({
    firstName: "Timber",
})
//SELECT * FROM "user" WHERE firstName = 'Timber'
```

Tìm một dựa vào điều kiện


```ts
const timber = await userRepository.findOne({
    where: {
        firstName: "Timber",
    },
})
//SELECT * FROM "user" WHERE firstName = 'Timber' LIMIT 1
```

Tìm kiếm và phân trang


```ts
const [users, totalCount] = await userRepository.findAndCount({
        order: {
            id: "DESC",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
```

**JOIN nhiều table**

```ts
userRepository.find({
    relations: {
        profile: true,
        photos: true,
        videos: true,
    },
})
```
Tương đương

```sql
SELECT * FROM "user"
LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"
```

**Một câu lệnh  Select Đầy đủ**

```ts
userRepository.find({
    select: {
        //Danh sách các trường cần lấy
        firstName: true,
        lastName: true,
    },
    relations: {
        //quan hệ với các table khác
        profile: true,
        photos: true,
        videos: true,
    },
    where: {
        //slect với điều kiện WHERE
        firstName: "Timber",
        lastName: "Saw",
        profile: {
            userName: "tshaw",
        },
    },
    //ORDER BY
    order: {
        name: "ASC",
        id: "DESC",
    },
    skip: 5, //offset pagination
    take: 10, //limit pagination
    cache: true, //Cache kết quả lấy được
})
```


#### 💡 SLECT COUNT

```ts
const count = await repository.count({
    where: {
        firstName: "Timber",
    },
})
//hoạc
const count = await repository.countBy({ firstName: "Timber" })
```

#### 💡 Câu lênh INSERT

```ts
//Thêm một record
await repository.insert({
    firstName: "Timber",
    lastName: "Timber",
})
//Thêm nhiều records một lần
await repository.insert([
    {
        firstName: "Foo",
        lastName: "Bar",
    },
    {
        firstName: "Rizz",
        lastName: "Rak",
    },
])
```
#### 💡 Câu lênh UPDATE


```ts
await repository.update({ age: 18 }, { category: "ADULT" })
// executes UPDATE user SET category = ADULT WHERE age = 18

await repository.update(1, { firstName: "Rizzrak" })
// executes UPDATE user SET firstName = Rizzrak WHERE id = 1
```

#### 💡 Câu lênh DELETE


```ts
await repository.delete(1)
await repository.delete([1, 2, 3])
await repository.delete({ firstName: "Timber" })
```


#### 💡 Thực thi một SQL thuần

```ts
const rawData = await userRepository.query(`SELECT * FROM USERS`)
```

#### 💡 Xóa data của mộ table

```ts
await repository.clear()

```

## 💛 Query Builder

Ngoài việc bạn sử dụng DataSource để truy vấn bạn còn có thể sử dụng Query Builder.

QueryBuilder là một trong những tính năng mạnh mẽ nhất của TypeORM - nó cho phép bạn xây dựng các truy vấn SQL bằng cú pháp nhanh gọn và tiện lợi, thực thi chúng và tự động chuyển đổi các đối tượng.

Khi nào dùng ?

- Khi bạn có một câu lệnh truy vấn phức tạp


Chi tiết các lệnh truy vấn:

- SELECT: https://typeorm.io/select-query-builder
- INSERT: https://typeorm.io/insert-query-builder
- UPDATE: https://typeorm.io/update-query-builder
- DELETE: https://typeorm.io/delete-query-builder


---


## 💛 HOMEWORKS - Tạo các Entities với TypeORM

Làm tuần tự lần lượt 

1. Employee
2. Custome
3. Category
4. Supplier
5. Product
6. Order
7. OrderDetails

Cấu trúc các bảng xem tại `Homeworks\Database-Structure`
