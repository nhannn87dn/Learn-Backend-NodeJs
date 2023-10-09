# Cài đặt

Tham khảo: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-sqlserver

## Create project setup

```bash
yarn init -y
yarn add prisma typescript ts-node @types/node --save-dev
```

Cấu hình TypeScript:

```bash
npx tsc --init
```

Bạn có thể chạy các Prisma CLI bằng tiếp đầu ngữ npx:

```bash
npx prisma
```

Tạo file  Prisma schema

```bash
npx prisma init
```

## Connect your database

Bạn phải tạo database trong SQL Server trước, sau đó:

Tạo file `.env`

```env
DATABASE_URL="sqlserver://localhost:1433;database=PrismaNodeJs;user=nhan;password=123456789;trustServerCertificate=true"
```

Sửa file `prisma/schema.prisma`

```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
```

## Creating the database schema

Thêm vào `prisma/schema.prisma`


```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```
Để đồng bộ Model đến Database bạn cần sử dụng các lệnh `prisma migrate CLI`

```bash
npx prisma migrate dev --name init
```

Lệnh trên sẽ làm 2 việc:

- Tạo một SQL migration mới
- Chạy SQL migration

Bạn sẽ nhận được một thông báo lỗi Error ở terminal

```bash
Error: Could not resolve @prisma/client in the current project. Please install it with yarn add @prisma/client, and rerun npx "prisma generate" 🙏.
```

Yêu cầu bạn cài `@prisma/client`

## Install Prisma Client

```bash
yarn add @prisma/client
```

## Querying the database

Thực hiện truy vấn với Prisma Client

Trước tiên bạn hãy tạo một dữ liệu mẫu ở `prisma/seed.ts` với lệnh

```bash
npx prisma db seed
```

Sau đó bạn tạo một route trong expressjs


Ví dụ để lấy tất cả các bài posts;

```ts
import { Prisma, PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'
const prisma = new PrismaClient()
const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

```

Xem các lệnh truy vấn: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries

## Thêm một Model Schema mới

Ví dụ bạn muôn thêm một Model Employees

```prisma
model Employees {
  id        Int      @id @default(autoincrement())
  fistName  String
  lastName  String
  birthday  DateTime?
  email String @unique
  numberPhone String @unique
  address String?
  password String
}
```

Data-Model: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

Relations: https://www.prisma.io/docs/concepts/components/prisma-schema/relations

Các Kiểu dữ liệu xem ở link này: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types

Sử dụng lệnh sau để thêm mới Schema này vào Database

```bash
npx prisma db push
```

Hoặc bạn sử dụng lệnh sau để vừa ghi nhận vào lịch sử migration và đồng bộ vào database

```bash
npx prisma migrate dev --name add-table-employees
```

==> Mỗi lần bạn thay đổi `prisma/schema.prisma` bạn lại thực hiện lệnh trên.

## Prisma Client

Trình tạo truy vấn an toàn và được tạo tự động cho Node.js và TypeScript.

Xem các lệnh truy vấn: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries

## Prisma Migrate

Prisma là một công cụ ORM (Object-Relational Mapping) và DSL (Domain-Specific Language) được sử dụng cho việc làm việc với cơ sở dữ liệu trong ứng dụng Node.js và TypeScript. Dưới đây là một số lệnh phổ biến trong Prisma:

1. Lệnh khởi tạo Prisma:

```
npx prisma init
```

Lệnh trên sẽ khởi tạo một dự án Prisma mới bằng cách tạo các tệp tin và thư mục cần thiết.

2. Lệnh tạo một migration mới:

```
npx prisma migrate dev
npx prisma migrate dev --name <migration-name>
```

Sử dụng lệnh prisma migrate dev để tạo các phiên bản migration và áp dụng chúng vào cơ sở dữ liệu. Lệnh này sẽ tự động so sánh schema hiện tại của Prisma với cơ sở dữ liệu và tạo ra các migration cần thiết để đồng bộ hóa chúng

3. Lệnh áp dụng các migration đã tạo:

```
npx prisma migrate deploy
```

Lệnh trên sẽ áp dụng các migration đã tạo và cập nhật cơ sở dữ liệu.

4. Lệnh tạo một model mới:

```
npx prisma generate
```

Lệnh trên sẽ tạo ra các file TypeScript cho các model mới đã được định nghĩa trong schema.

5. Lệnh tạo dữ liệu mẫu (seeding):

```
npx prisma db seed
```

Lệnh trên sẽ chạy các file seed để tạo dữ liệu mẫu trong cơ sở dữ liệu.

6. Lệnh tạo và cập nhật schema:

```
npx prisma db push
```

Lệnh trên sẽ tạo và cập nhật schema dựa trên các thay đổi mới trong file schema.

7. Lệnh tạo file schema dựa trên cơ sở dữ liệu hiện tại:

```
npx prisma introspect
```

Lệnh trên sẽ tạo file schema dựa trên cấu trúc cơ sở dữ liệu hiện tại.

Đây chỉ là một số lệnh phổ biến trong Prisma. Prisma cung cấp nhiều lệnh khác để làm việc với cơ sở dữ liệu, tạo migration, seed, và nhiều tác vụ khác liên quan đến quản lý dữ liệu. Bạn có thể tìm hiểu thêm về các lệnh khác và tài liệu chi tiết của Prisma tại trang chủ Prisma: [https://www.prisma.io/docs/ ↗](https://www.prisma.io/docs/)


## Prisma Studio

Một GUI để xem và chỉnh sửa dữ liệu trong cơ sở dữ liệu của bạn

Doc: https://www.prisma.io/studio

```bash
npx prisma studio
```



## Project tham khảo

- https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-express/README.md
- https://github.com/antonio-lazaro/prisma-express-typescript-boilerplate/tree/main