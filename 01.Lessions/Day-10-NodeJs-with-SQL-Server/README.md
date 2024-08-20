# SQL Server with TypeORM

Truy vấn dữ liệu trong TypeORM

## 💛 Sử dụng Repository

```ts
// Import DataSource
import { AppDataSource } from "../../data-soucre.ts"
//Import Entity
import { User } from "./entities/User";

//Khởi tạo Repository
const userRepository = AppDataSource.getRepository(User)

//Truy vấn với Repository
const user = await userRepository.findOneBy({
    id: 1,
});
```
Chi tiết các lệnh với `Repository`: https://typeorm.io/repository-api



### 💡 Câu lệnh INSERT

Dùng phương thức `insert`

```ts
//Thêm một record
await userRepository.insert({
    firstName: "Timber",
    lastName: "Timber",
})
//Thêm nhiều records một lần
await userRepository.insert([
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

Dùng phương thức `create`

```ts
//Tạo
const user = userRepository.create({
    firstName: "Timber",
    lastName: "Saw"
})
//lưu
await userRepository.save(user)
```

Hoặc khởi tạo từ đối tượng Entity

```ts
//Tạo
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
//lưu
await userRepository.save(user)
```

#### Tạo mới với quan hệ ONE-to-ONE

```ts
//Tạo đối tượng tham quan hệ trước
const profile = new Profile();
profile.gender = "Female";
profile.photo = "photo";

//Tạo đối tượng tham chiếu sau
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
/**
 * bên dưới Database là trường profileId, 
 * nhưng bạn không được thao tác với tên là profileId
 * mà dùng chính tên mà bạn thiết lập quan hệ trong Entity để thao tác
 */
user.profile = profile;
//lưu
await profileRepository.save(profile)
await userRepository.save(user)
```

#### Tạo mới với quan hệ ONE-to-MANY / MANY-TO-ONE

Ví dụ: một Sản phẩm có nhiều hình ảnh

```ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
} from "typeorm"


@Entity()
export class Photo {
    /* ... other columns */

    @ManyToOne(() => Author, (author) => author.photos)
    author: Author
}

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
    photos: Photo[]
}

// create a few photos
const photo1 = new Photo()
photo1.name = "Me and Bears"
photo1.description = "I am near polar bears"
photo1.filename = "photo-with-bears.jpg"
photo1.isPublished = true

const photo2 = new Photo()
photo2.name = "Me and Bears 2"
photo2.description = "I am near polar bears 2"
photo2.filename = "photo-with-bears-2.jpg"
photo2.isPublished = true

// create a few albums
const auth = new Author()
auth.name = "Me and Bears"
auth.photos = [photo1, photo2] //Là một Mảng
await authRepository.save(auth)
```


#### Tạo mới với quan hệ MANY-TO-MANY

Ví dụ: Giữa `Order` với `OrderItems`.


```ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Photo, (photo) => photo.albums)
    @JoinTable()
    photos: Photo[]
}
```

Ở Album bạn thiết lập `@JoinTable` để xác định chủ sở hữu của quan hệ.
Có thể hiểu: Để tạo Photo thì bạn nên tạo khi tạo Album, chứ không theo hướng ngược lại.

```ts
export class Photo {
    // ... other columns

    @ManyToMany(() => Album, (album) => album.photos)
    albums: Album[]
}
```

Tạo ra table phụ

```html
+-------------+--------------+----------------------------+
|                album_photos_photo_albums                |
+-------------+--------------+----------------------------+
| album_id    | int(11)      | PRIMARY KEY FOREIGN KEY    |
| photo_id    | int(11)      | PRIMARY KEY FOREIGN KEY    |
+-------------+--------------+----------------------------+
```

```ts
/// create a few albums
const album1 = new Album()
album1.name = "Bears"
await AppDataSource.manager.save(album1)

const album2 = new Album()
album2.name = "Me"
await AppDataSource.manager.save(album2)

// create a few photos
const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true
photo.albums = [album1, album2]
await AppDataSource.manager.save(photo)
```


### 💡 Câu lênh SELECT

```ts
await userRepository.find({
    select: {
        firstName: true,
        lastName: true,
    },
})
//SELECT "firstName", "lastName" FROM "user"
```


Lấy tất cả * dựa vào một hoặc nhiều điều kiện

```ts
await  userRepository.findBy({
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
await  userRepository.find({
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
await  userRepository.find({
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

Join và lấy tất cả các trường

```ts
await  userRepository.find({
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

Join và lấy các trường cụ thể

```ts
await  productRepository.find({
    relations: {
        category: true
    },
    select: {
        id: true,
        name: true,
        //Chi lay field Name cua table Categories
        category: {
            name: true
        }
    },
})
```


**Một câu lệnh  Select Đầy đủ**

```ts
await  userRepository.find({
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

Mạnh mẽ hơn cách sử dụng Respository

- https://typeorm.io/working-with-entity-manager
- https://typeorm.io/entity-manager-api

### Query Builder

Sử dụng khi bạn cần truy vấn với cú pháp phức tạp

- https://typeorm.io/select-query-builder 


## 💛 Kết nối các Entity với Service

Ví dụ cho `category.service.ts`

Tương tự như đã làm trong service sử dụng `mongoose`

```ts
import createError from 'http-errors';
// Import DataSource
import { AppDataSource } from "./data-soucre"
//Import Entity
import { Category } from "./entities/category.entity";

//Khởi tạo Repository
const categoryRepository = AppDataSource.getRepository(Category)

//get All Records
const findAll = async (query: any)=>{

        /* Phân trang */
    const page_str = query.page;
    const limit_str = query.limit;

    const page = page_str ? parseInt(page_str as string): 1;
    const limit = limit_str ? parseInt(limit_str as string): 10;

    //Truy vấn có phân trang
    const [categories, totalCount] = await categoryRepository.findAndCount({
        //where: {
        //},
        order: {
            category_id: "DESC",
        },
        skip: (page - 1) * limit,
        take: limit,
    });

    return {
        categories,
        pagination: {
            limit: limit,// số lượng item trên 1 trang
            page: page, //trang hiện tại
            totalPages: Math.ceil(totalCount / limit), //tổng số trang
            totalIRecords: totalCount, //tổng số records
        }
    }
}

//get Single Record
const findOne = async (id: number)=>{
    const category = await categoryRepository.findOne({
        where: {
            category_id: id,
        },
    })
    if(!category){
        throw createError(400, 'Category not found')
    }
    return category
}

//Insert new a record
const create = async(payload)=>{
    // const category = await categoryRepository.insert(payload)
    //hoặc
    const result = categoryRepository.create(payload);
    const category = await categoryRepository.save(result);

    return category
}

//update a record

const updateById = async(id: number, payload)=>{
    //Lấy lại hàm findOne trên dùng
    const category = await findOne(id);
    //Thay đổi
    //Merge category và payload lại với nhau
    Object.assign(category, payload);

    const updated = await categoryRepository.save(category)
    return updated;
}

//delete a record

const deleteById = async (id: number) => {
    //Check xem ID do con ton tai ko da
    const category = await findOne(id);
    const result = await categoryRepository.delete({
        id: category.category_id
    })
  return category;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};

```

Ví dụ cho `product.service.ts` có quan hệ


```ts
import createError from 'http-errors';
// Import DataSource
import { AppDataSource } from "./data-soucre"
//Import Entity
import { Product } from "./entities/product.entity";

//Khởi tạo Repository
const productRepository = AppDataSource.getRepository(Product)

//get All Records
const findAll = async (query: any)=>{

    /* Phân trang */
    const page_str = query.page;
    const limit_str = query.limit;

    const page = page_str ? parseInt(page_str as string): 1;
    const limit = limit_str ? parseInt(limit_str as string): 10;

    /* Lọc theo từng điều kiện */
    let whereConditions: any = {};
    // Chỉ thêm điều kiện tìm kiếm theo category nếu query.category tồn tại
    if(query.category && query.category != ''){
        whereConditions = {...whereConditions, category: {
                category_id: query.category
        }}
    }

    //Các điều kiện khác tại đây
    
    //Sắp xếp
    let objSort: any = {};
    const sortBy = query.sort || 'product_id'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const orderBy = query.order && query.order == 'ASC' ? 'ASC': 'DESC'
    objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

    //Truy vấn có phân trang
    const [products, totalCount] = await productRepository.findAndCount({
        where: whereConditions,
        relations: {
            //quan hệ với các table khác
            category: true,
           // brand: true, 
        },
        order: objSort,
        skip: (page - 1) * limit,
        take: limit,
    });

    return {
        products,
        sort: objSort,
        filters: whereConditions,
        pagination: {
            limit: limit,// số lượng item trên 1 trang
            page: page, //trang hiện tại
            totalPages: Math.ceil(totalCount / limit), //tổng số trang
            totalIRecords: totalCount, //tổng số records
        }
    }
}

//get Single Record
const findOne = async (id: number)=>{
    const product = await productRepository.findOne({
        where: {
            product_id: id,
        },
    })
    if(!product){
        throw createError(400, 'Product not found')
    }
    return product
}

//Insert new a record
const create = async(payload)=>{
    // const product = await productRepository.insert(payload)
    //hoặc
    const result = productRepository.create(payload);
    const product = await productRepository.save(result);

    return product
}

//update a record

const updateById = async(id: number, payload)=>{
    //Lấy lại hàm findOne trên dùng
    const product = await findOne(id);
    //Thay đổi
    //Merge category và payload lại với nhau
    Object.assign(product, payload);

    const updated = await productRepository.save(product)
    return updated;
}

//delete a record

const deleteById = async (id: number) => {
    //Check xem ID do con ton tai ko da
    const product = await findOne(id);
    const result = await productRepository.delete({
        id: product.product_id
    })
  return product;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};

```