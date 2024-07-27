# Connecting SQL Server using Prisma ORM

Prisma là một công cụ ORM (Object-Relational Mapping) và một lớp truy vấn dữ liệu mạnh mẽ được phát triển bởi Prisma Labs.

Prisma hỗ trợ nhiều loại cơ sở dữ liệu như MySQL, PostgreSQL và SQLite. Nó cung cấp các tính năng như tạo, đọc, cập nhật và xóa dữ liệu, quan hệ, sắp xếp, lọc và phân trang dữ liệu, và nhiều tính năng khác để làm việc với cơ sở dữ liệu một cách dễ dàng và hiệu quả.

Tài liệu: https://www.prisma.io/docs/getting-started

## 💛 Cài đặt Prisma vào ExpressJs

### 🌻 Đối với dự án mới

#### 🔸 Create project setup

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

#### 🔸 Connect your database

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

#### 🔸 Creating the database schema

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

#### 🔸 Install Prisma Client

```bash
yarn add @prisma/client
```

#### 🔸 Querying the database

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

### 🌻 Đối với dự án đã tồn tại

#### 🔸 Cài thư viện Prisma

```bash
yarn add prisma --save-dev
```

Tạo file  Prisma schema

```bash
npx prisma init
```

#### 🔸 Connect your database

Bạn phải tạo database trong SQL Server trước, sau đó:

Tạo file `.env`

```env
DATABASE_URL="sqlserver://localhost:1433;database=PrismaNodeJs;user=nhan;password=123456789;trustServerCertificate=true"
```
#### 🔸 Cài đặt Prisma Client

```bash
yarn add @prisma/client
```
Sau đó bạn đánh lệnh sau để tạo ra file Schema

```bash
npx prisma generate
```
Sau đó bạn sửa lại `prisma/schema.prisma` đúng với database

```schema
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  createdAt DateTime @default(now()) @db.Timestamp(6)
  content   String?
  published Boolean  @default(false)
  authorId  Int
  User      User     @relation(fields: [authorId], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  userId Int     @unique
  User   User    @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model User {
  id      Int      @id @default(autoincrement())
  name    String?  @db.VarChar(255)
  email   String   @unique @db.VarChar(255)
  Post    Post[]
  Profile Profile?
}
```


## 💛 Tạo các Model 

Làm tuần tự lần lượt 

1. Employee
2. Customer
3. Category
4. Supplier
5. Product
6. Order
7. OrderDetails

Cấu trúc các bảng xem tại `Homeworks\Database-Structure`

## 💛 Mockup DATA cho SQL Server

Xem: https://www.prisma.io/docs/guides/migrate/seed-database

Bạn tạo file `prisma/seed.ts`

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Chắc chắn rằng bạn đã cài các thư viện cho typescript

```bash
yarn add -D typescript ts-node @types/node
```

Sau đó bạn sửa thêm đoạn này vào `package.json`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "seed": "ts-node prisma/seed.ts" //<== Here
  },
  "devDependencies": {
    "@types/node": "^14.14.21",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.3"
  }
}
```

Sau để để seed data bạn đánh lệnh

```bash
npx prisma db seed
```