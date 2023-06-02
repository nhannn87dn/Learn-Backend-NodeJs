# Mongoose-CRUD-Operations

## 💛 Queries

Doc MongoDB CRUD: <https://www.mongodb.com/docs/manual/crud/>

Mongoose Queries: <https://mongoosejs.com/docs/queries.html>

- Model.deleteMany(): Xóa nhiều
- Model.deleteOne(): Xóa một
- Model.find() : Tìm kiếm nhiều documents
- Model.findById(): Tìm kiếm bởi ID
- Model.findByIdAndDelete(): Tìm bởi ID nếu thấy thì Xóa
- Model.findByIdAndRemove(): Tìm bởi ID nếu thấy thì Xóa
- Model.findByIdAndUpdate(): Tìm bởi ID nếu thấy thì UPdate
- Model.findOne(): Tìm một documents
- Model.findOneAndDelete(): Tìm một documents và xóa
- Model.findOneAndRemove(): Tìm một documents và xóa
- Model.findOneAndReplace(): Tìm một documents và thay thế
- Model.findOneAndUpdate(): Tìm một documents và update
- Model.replaceOne(): Thay thế một document
- Model.updateMany(): Update nhiều documents
- Model.updateOne(): Update một document

DÙNG FILE `products-example.json` ĐỂ TEST

## 💛 Query Selectors

> <https://www.mongodb.com/docs/manual/reference/operator/query/>

### 🔶 Tìm kiểu so sánh - Comparison

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
| $eq  | Matches values that are equal to a specified value.                 |
| $gt  | Matches values that are greater than a specified value.             |
| $gte | Matches values that are greater than or equal to a specified value. |
| $in  | Matches any of the values specified in an array.                    |
| $lt  | Matches values that are less than a specified value.                |
| $lte | Matches values that are less than or equal to a specified value.    |
| $ne  | Matches all values that are not equal to a specified value.         |
| $nin | Matches none of the values specified in an array.                   |

### 🔶 Tìm kiếm với Logical

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
| $eq  | Matches values that are equal to a specified value.                 |
| $gt  | Matches values that are greater than a specified value.             |
| $gte | Matches values that are greater than or equal to a specified value. |
| $in  | Matches any of the values specified in an array.                    |
| $lt  | Matches values that are less than a specified value.                |
| $lte | Matches values that are less than or equal to a specified value.    |
| $ne  | Matches all values that are not equal to a specified value.         |
| $nin | Matches none of the values specified in an array.                   |

### 🔶 Array

| Name       | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| $all       | Matches arrays that contain all elements specified in the query.                                 |
| $elemMatch | Selects documents if element in the array field matches all the specified $elemMatch conditions. |
| $size      | Selects documents if the array field is a specified size.                                        |

## 💛 Sorting - Sắp xếp

Sắp xếp kết quả trả về theo một thuộc tính nào đó với trật từ tăng dần hoặc giảm dần

```js
const personSchema = new mongoose.Schema({
  age: Number,
});

const Person = mongoose.model('Person', personSchema);
for (let i = 0; i < 10; i++) {
  await Person.create({ age: i });
}

await Person.find().sort({ age: -1 }); // returns age starting from 10 as the first entry
await Person.find().sort({ age: 1 }); // returns age starting from 0 as the first entry
```

## 💛 Find

```js
// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } })
  .select('name friends')
  .exec();

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```

Xem thêm về select: <https://mongoosejs.com/docs/api/query.html#Query.prototype.select()>

## 💛 Pagination - Phân trang

- https://mongoosejs.com/docs/api/query.html#Query.prototype.skip()

- https://mongoosejs.com/docs/api/query.html#Query.prototype.slice()

Công thức phân trang

```js
const currentPage = 1; //trang hiện tại
const pageSize = 10; // Số lượng items trên 1 trang

Model.find({})
  .skip((currentPage - 1) * pageSize)
  .limit(pageSize)
  .exec();
```

## 💛 Populate

Lấy thông tin từ nhiều collections thông qua \_id references

Doc: <https://mongoosejs.com/docs/populate.html>

Lấy thông tin một sản phẩm bao gồm cả tên danh mục sản phẩm

```js
const product = await Product.find().populate('category');
```

## 💛 MongoDB Shell

> TIP: Install extension for VS Code: https://www.mongodb.com/products/vs-code

### Insert Documents

MongoDB shell cung cấp 2 phương thức để insert documents đến một collection

**Insert a Single Document**

```js
// Select the database to use.
use('api-training');

// The drop() command destroys all data from a collection.
// Make sure you run it against the correct database and collection.
db.movies.drop();

// Insert a few documents into the sales collection.
db.movies.insertOne({
  title: 'The Favourite',
  genres: ['Drama', 'History'],
  runtime: 121,
  rated: 'R',
  year: 2018,
  directors: ['Yorgos Lanthimos'],
  cast: ['Olivia Colman', 'Emma Stone', 'Rachel Weisz'],
  type: 'movie',
});
```

`insertOne()` trả về một document mới kèm theo \_id

**Insert Multiple Documents**

Chèn một lúc nhiều document

```js
use('api-training');
// db.movies.drop();
db.movies.insertMany([
  {
    title: 'Jurassic World: Fallen Kingdom',
    genres: ['Action', 'Sci-Fi'],
    runtime: 130,
    rated: 'PG-13',
    year: 2018,
    directors: ['J. A. Bayona'],
    cast: ['Chris Pratt', 'Bryce Dallas Howard', 'Rafe Spall'],
    type: 'movie',
  },
  {
    title: 'Tag',
    genres: ['Comedy', 'Action'],
    runtime: 105,
    rated: 'R',
    year: 2018,
    directors: ['Jeff Tomsic'],
    cast: ['Annabelle Wallis', 'Jeremy Renner', 'Jon Hamm'],
    type: 'movie',
  },
]);
```

### Update Documents

> Doc: <https://www.mongodb.com/docs/mongodb-shell/crud/update/>

- To update a single document, use
  db.collection.updateOne().

- To update multiple documents, use
  db.collection.updateMany().

- To replace a document, use
  db.collection.replaceOne().

### Delete Documents

> <https://www.mongodb.com/docs/mongodb-shell/crud/delete/>

- To delete multiple documents, use db.collection.deleteMany().

- To delete a single document, use db.collection.deleteOne().

### Query Documents

> <https://www.mongodb.com/docs/mongodb-shell/crud/read/>

Use the db.collection.find() method in the MongoDB Shell to query documents in a collection
