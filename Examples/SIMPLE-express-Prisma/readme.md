# Settings

## 1 - install dependencies

```bash
yarn
```

Setup environment .env

```bash
DATABASE_URL="sqlserver://localhost:1433;database=myTest;user=nhan;password=123456789;trustServerCertificate=true"
```

## 2 - Create and seed the database

```bash
npx prisma migrate dev --name init
```

## 3 - Prisma 

Prisma là một công cụ ORM (Object-Relational Mapping) và DSL (Domain-Specific Language) được sử dụng cho việc làm việc với cơ sở dữ liệu trong ứng dụng Node.js và TypeScript. Dưới đây là một số lệnh phổ biến trong Prisma:

1. Lệnh khởi tạo Prisma:

```
npx prisma init
```

Lệnh trên sẽ khởi tạo một dự án Prisma mới bằng cách tạo các tệp tin và thư mục cần thiết.

2. Lệnh tạo một migration mới:

```
npx prisma migrate dev --name <migration-name>
```

Lệnh trên sẽ tạo một migration mới dựa trên các thay đổi trong schema và tạo phiên bản mới của cơ sở dữ liệu.

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