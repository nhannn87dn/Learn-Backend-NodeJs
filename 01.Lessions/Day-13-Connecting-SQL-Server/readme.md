# Using MongoDB and SQL Server

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
- Tại mục SQL Server Network Configruration --> chọn Protocals for MSSQLSERVER
- Tại cửa sổ bên phải: Click phải lên TCP/IP --> Enable


## 💛 Connecting to SQL Server 

Học cách kết nối với Database để lấy dữ liệu sau đó trả về cho Clients
### 🔶 Kết nối với SQL Server với ORM Tools

#### 🌻 ORM là gì ?

ORM viết tắt của "Object-Relational Mapping", là một mô hình lập trình được sử dụng để ánh xạ dữ liệu giữa hệ quản trị cơ sở dữ liệu (Relational Database Management System - RDBMS) và các đối tượng trong các ngôn ngữ lập trình hướng đối tượng (như Java, Python, C#, TypeScript, và nhiều ngôn ngữ khác). Mục tiêu chính của ORM là giúp đơn giản hóa việc làm việc với cơ sở dữ liệu bằng cách biến đổi dữ liệu được lưu trữ trong các bảng cơ sở dữ liệu thành các đối tượng có thể được truy cập và quản lý bằng mã lập trình.

Có rất nhiều Tools ORM: Sequelize, Prisma, TypeORM ...hỗ trợ javascript và TypeScript

---

## 💛 SQL Server with TypeORM library

### Cài đặt

```bash
yarn add typeorm reflect-metadata mssql 
```

```bash
yarn add -D @types/node
```

**TypeScript configuration**

Sửa file tsconfig.json, thêm vào compilerOptions

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

### Kết nối Expressjs Với SQL Server sử dụng TypeORM

#### Bước 1 - Tạo file AppDataSource.ts để cấu hình kết nối

```ts

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'PCNHAN',
  port: 1433,
  username: 'nhan',
  password: '123456789',
  database: 'AptechTest',
  entities: ['src/entities/**/*.entity{.ts,.js}', 'src/entities/**/*.schema{.ts,.js}'],
  synchronize: true,
  logging: false,
  options: {
    encrypt: false,
  },
});
```

#### Bước 2 - Tạo Các Model

Trong thư mục src tạo folder `entities` chứa tất cả Entity (Model)

Tạo một file Entity `employee.entity.ts`

Chi tiết xem: https://typeorm.io/#create-an-entity

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  firstName: string;

  @Column({ length: 20, nullable: false })
  lastName: string;

  @Column({ length: 120, nullable: false })
  numberPhone: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 50, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ length: 255, nullable: false })
  password: string;
}

```

Sau khi kết nối hệ thống sẽ tự động tạo ra trong Database của bạn một table có tên `employee`

#### Bước 3 - Kết nối AppDataSource vào server Express

bạn sửa code server.ts thành như sau:

```ts
require('dotenv').config();
import 'reflect-metadata';
import { AppDataSource } from "./AppDataSource";

const app = require("./src/app");
const PORT = process.env.PORT || 9000;

AppDataSource.initialize().then(() => {
    console.log("🚀[SQL Server] Data Source has been initialized!");


        const server = app.listen(PORT, () =>
        console.log(`🚀[ExpressJs] Server ready at: http://localhost:${PORT}`),
        )

})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
```

Cho Server SQL khởi động thành công trước, sau đó khởi động server Express

Kết quả Nếu bạn thấy ở log của Terminal là kết nối thành công
Kiểm tra Database của bạn xem, table employee có được tạo không

```bash
🚀[SQL Server] Data Source has been initialized!
🚀[ExpressJs] Server ready at: http://localhost:9000
```

### Sử dụng kết nối trong các Routes

Ví dụ bạn tạo file src/routes/employee.route.ts

```ts
import { AppDataSource } from '../../AppDataSource';
import { Router, NextFunction, Request, Response } from 'express';
import { Employee } from '../entities/employee.entity';
const router = Router();// register routes
const repository = AppDataSource.getRepository(Employee);


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employees = await repository.find()
        res.json(employees)
    }
    catch(err){
        next(err)
    }
   
})

router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const results = await repository.findOneBy({
            id: parseInt(req.params.id),
        })
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employee = await repository.create(req.body)
        const results = await repository.save(employee)
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employee = await repository.findOneBy({
            id: parseInt(req.params.id),
        })
        repository.merge(employee, req.body)
        const results = await repository.save(employee)
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
    const results = await repository.delete(req.params.id)
    res.json(results)
    }
    catch(err){
        next(err)
    }
})

export default router;

```

Sau đó gắn nó vào app.ts

```ts
import employeeRoutes from "./routes/employee.route"
//...
app.use('/api/v1/employees', employeeRoutes);
```

---

==> TEST CÁC APIs

## 💛 Entities là gì


Trong TypeORM, một "entity" (thực thể) đại diện cho một đối tượng trong cơ sở dữ liệu. Mỗi entity tương ứng với một bảng trong cơ sở dữ liệu và các trường của entity tương ứng với các cột trong bảng đó. TypeORM sử dụng các đối tượng entity để thực hiện các thao tác thêm, sửa, xóa và truy vấn dữ liệu.

### 🚩 Cách Tạo một Entity

Chi tiết: https://typeorm.io/entities

### 🚩 Embedded Entities

Trong TypeORM, "Embedded Entities" là một khái niệm cho phép nhúng (embed) một entity vào trong một entity khác. Điều này cho phép bạn tạo ra một mối quan hệ mạnh mẽ giữa các đối tượng và lưu trữ dữ liệu liên quan trong cùng một bảng hoặc cùng một cột trong cơ sở dữ liệu.

```ts
import { Entity, Column, PrimaryGeneratedColumn, Embedded } from 'typeorm';

@Embedded()
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

Chi tiết: https://typeorm.io/data-source-api

---

## 💛 Relations - Các kiểu quan hệ

### One-to-one

Chi tiết: https://typeorm.io/one-to-one-relations


### Many-to-one / one-to-many

Chi tiết: https://typeorm.io/many-to-one-one-to-many-relations


### Many-to-many

Chi tiết: https://typeorm.io/many-to-many-relations


Ví dụ:

```ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { OrderDetail } from './order-details.entity';

@Entity({ name: 'Products' })
export class Product {
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

### Entity Manager

Bạn có thể : insert, update, delete, load, etc. với Entity Manager

Chi tiết: https://typeorm.io/working-with-entity-manager

### Repository

Nó giống như Entity Manager nhưng nó bị giới hạn tại một enity cụ thể

Chi tiết: https://typeorm.io/working-with-entity-manager




## 💛 Query Builder

Ngoài việc bạn sử dụng DataSource để truy vấn bạn còn có thể sử dụng Query Builder

- SELECT: https://typeorm.io/select-query-builder
- INSERT: https://typeorm.io/insert-query-builder
- UPDATE: https://typeorm.io/update-query-builder
- DELETE: https://typeorm.io/delete-query-builder


---


## Tạo các Model với TypeORM

Làm tuần tự lần lượt 

1. Employee
2. Customer
3. Category
4. Supplier
5. Product
6. Order
7. OrderDetails

Cấu trúc các bảng xem tại `Homeworks\Database-Structure`
