# Express with SQL Server

Truy vấn dữ liệu trong TypeORM

## 💛 Sử dụng Repository

```ts
import { AppDataSource } from "../../data-soucre.ts"
import { User } from "./entities/User";


const userRepository = AppDataSource.getRepository(User)
const user = await userRepository.findOneBy({
    id: 1,
});
```
Chi tiết các lệnh với `Repository`: https://typeorm.io/repository-api



### 💡 Câu lênh SELECT

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

Toán tử AND

```ts
userRepository.find({
    where: {
        firstName: "Timber",
        lastName: "Saw",
    },
})
//SELECT * FROM "user"
//WHERE "firstName" = 'Timber' AND "lastName" = 'Saw'
```

Toán tử OR

```ts
userRepository.find({
    where: [
        { firstName: "Timber"},
        { firstName: "Stan"},
    ],
})
//SELECT * FROM "user" 
//WHERE "firstName" = 'Timber'  OR "firstName" = 'Stan'
```
 

Toán tử SO SÁNH

```ts
import { 
LessThan, 
LessThanOrEqual, 
MoreThan,
MoreThanOrEqual,
Equal
} from "typeorm"

const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: LessThan(10),
})
//SELECT * FROM "post" WHERE "likes" < 10


const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: LessThanOrEqual(10),
})
//SELECT * FROM "post" WHERE "likes" <= 10


const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: MoreThan(10),
})
//SELECT * FROM "post" WHERE "likes" > 10

const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: MoreThanOrEqual(10),
})
//SELECT * FROM "post" WHERE "likes" >= 10


const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Equal("About #2"),
})
//SELECT * FROM "post" WHERE "title" = 'About #2'
```

Toán tử LIKE

```ts
import { Like } from "typeorm"

const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Like("%out #%"),
})
//SELECT * FROM "post" WHERE "title" LIKE '%out #%'
```

Toán tử Between


```ts
import { Between } from "typeorm"

const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: Between(1, 10),
})
//SELECT * FROM "post" WHERE "likes" BETWEEN 1 AND 10
```

Toán tử IN


```ts
import { In } from "typeorm"

const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: In(["About #2", "About #3"]),
})
//SELECT * FROM "post" WHERE "title" IN ('About #2','About #3')
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


### 💡 SELECT COUNT

```ts
const count = await repository.count({
    where: {
        firstName: "Timber",
    },
})
//hoạc
const count = await repository.countBy({ firstName: "Timber" })
```

### 💡 Câu lệnh INSERT

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

### 💡 Câu lênh UPDATE


```ts
await repository.update({ age: 18 }, { category: "ADULT" })
// executes UPDATE user SET category = ADULT WHERE age = 18

await repository.update(1, { firstName: "Rizzrak" })
// executes UPDATE user SET firstName = Rizzrak WHERE id = 1
```

### 💡 Câu lênh DELETE


```ts
await repository.delete(1)
await repository.delete([1, 2, 3])
await repository.delete({ firstName: "Timber" })
```


### 💡 Thực thi một SQL thuần

```ts
const rawData = await userRepository.query(`SELECT * FROM USERS`)
```

### 💡 Xóa data của mộ table

```ts
await repository.clear()

```

XEM ĐẦY ĐỦ TẠI: https://typeorm.io/find-options

---

## 💛 Cách thức truy vấn khác

Ngoài cách sử dụng Repository trên bạn có thể sử dụng  

### EntityManager

- https://typeorm.io/working-with-entity-manager
- https://typeorm.io/entity-manager-api

### Query Builder

- https://typeorm.io/select-query-builder 

---

## 💛 Prisma with SQL Server

Tham khảo thêm với cách sử dụng [Prisma SQL Server](prisma-SQLServer.md) một thư viện ORM mạnh mẽ khác



--- 

