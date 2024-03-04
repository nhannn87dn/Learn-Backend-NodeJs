# Express with SQL Server

Tiếp tục bài trước

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



## 💛 Prisma with SQL Server

Tham khảo thêm với cách sử dụng [Prisma SQL Server](prisma-SQLServer.md)


---

