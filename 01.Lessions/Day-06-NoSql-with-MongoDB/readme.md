# Mongoose-CRUD-Operations

## 💛 Hoàn thiện các Models Homeworks

Hướng dẫn code các Models


## 💛 Tạo mới Document

```js
await Tank.create({ size: 'small' });
// or 
const tank = new Tank({ size: 'small' });
await tank.save();

// or, for inserting large batches of documents
await Tank.insertMany([{ size: 'small' }]);
```
### Nếu theo Embed

Một `User` có một `Profile`

Cấu trúc Schema:

```js
const ProfileSchema = new Schema({
  bio: String,
  //...
});

const UserSchema = new Schema({
  name: String,
  profile: ProfileSchema
});
```

Cách triển khai

```js
const user = await User.create({
  name: 'User Name',
  profile: {
    bio: 'ABC',
    blood: 'o+',
    color: 'yellow'
  }
});
```


### Nếu Referenced - One-to-One

Một `User` có một `Profile`

Cấu trúc Schema:

```js
const ProfileSchema = new Schema({
  bio: String,
  //...
});

const UserSchema = new Schema({
  name: String,
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
});
```

Cách thực hiện: 

Tạo document độc lập trước, rồi tạo document phụ thuộc sau

```js
//Tạo Profile trước
const profile = await Profile.create({
   bio: 'Bio here',
  //...
});
//Sau đó lấy id của Profile để đưa vào tạo User
const user = await User.create({
  name: 'User Name',
  profile: profile._id
});
```

### Nếu Referenced - One-to-Many

Một `Author` có nhiều `Book`


Cấu trúc Schema:

```js
const AuthorSchema = new Schema({
  name: String,
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const BookSchema = new Schema({
  title: String,
  //...
});
```

Cách thực hiện: 

```js
//Tạo Books trước
const books = await Book.insertMany([
  {title: 'Book 1'},
  {title: 'Book 2'},
  ]);
//Sau đó lấy mảng id của book để đưa vào tạo Author
const author = await Author.create({
    name: 'Author Name',
    books: books.map(book => book._id) // chỉ lấy _id của từng book
});
```

### Nếu Referenced - Many-to-Many

Một `Student` tham gia nhiều `Course`, và một `Course` có nhiều `Student`

Đây là cách mô phỏng quan hệ nhiều-nhiều trong MongoDB bằng cách sử dụng các tham chiếu (references)

Cấu trúc Schema:

```js
const StudentSchema = new Schema({
  name: String,
  enrollments: [{
    type: Schema.Types.ObjectId,
    ref: 'Enrollment'
  }]
});

const CourseSchema = new Schema({
  name: String,
  enrollments: [{
    type: Schema.Types.ObjectId,
    ref: 'Enrollment' 
  }]
});
/**
 * Được xem như một bảng phụ
 * Để thể hiện quan hệ nhiều - nhiều
 */
const EnrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'  //Tham chiếu references
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course' //Tham chiếu references
  },
  enrollmentDate: Date
});
```


Cách thực hiện: 

```js
// Tạo Student và Course trước
const student = await Student.create({ name: 'Student Name' });
const course = await Course.create({ name: 'Course Name' });

// Sau đó tạo Enrollment
const enrollment = await Enrollment.create({
  student: student._id,
  course: course._id,
  enrollmentDate: new Date()
});

// Cập nhật Student và Course với Enrollment
student.enrollments.push(enrollment._id);
course.enrollments.push(enrollment._id);

await student.save();
await course.save();
```


## 💛 Fake Database to MongoDB

Tạo dữ liệu Fake  ==> Để có dữ liệu truy vấn.

Sử dụng https://fakerjs.dev


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

---


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

Doc: https://www.mongodb.com/docs/manual/reference/operator/query-comparison/

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

Doc: https://www.mongodb.com/docs/manual/reference/operator/query-logical/

### 🔶 Array

| Name       | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| $all       | Matches arrays that contain all elements specified in the query.                                 |
| $elemMatch | Selects documents if element in the array field matches all the specified $elemMatch conditions. |
| $size      | Selects documents if the array field is a specified size.                                        |

Doc: https://www.mongodb.com/docs/manual/reference/operator/query-array/

---

### 🔶 Truy vấn cơ bản

#### 🚩 Tìm kiếm tất cả

```js
// SELECT * FROM Tank
const tanks = await Tank.find();
console.log("All tanks:", tanks);
```

#### 🚩 Chọn các trường cần thiết

```js
// SELECT color, size FROM Tank
const tanks = await Tank.find().select('color size -__v');
// Hoặc lấy tất cả loại trừ mỗi __v
const tanks = await Tank.find().select('-__v');
```

- Liệt kê các trường cần lấy trong `select()` cách nhau bởi dấu cách.
- Trường không cần lấy thì loại trừ với cú pháp `-` ví dụ: `-__v`

#### 🚩 Tìm kiếm và sắp xếp

```js
const tanks = await Tank
.find()
.select('-__v')
.sort({
  size: 1, //sắp xếp tăng dần
  color: -1, //sắp xếp giảm dần
});
```


#### 🚩 Tìm kiếm với điều kiện

```js
// SELECT * FROM Tank WHERE size = 'small'
const smallTanks = await Tank.find({ size: 'small' });
  console.log("Small tanks:", smallTanks);
```

#### 🚩 Tìm một tài liệu

Trả về 1 record duy nhất

```js
// SELECT TOP 1 * FROM Tank WHERE size = 'small'
const tank = await Tank.findOne({ size: 'small' });
console.log("One small tank:", tank);
```

#### 🚩 Tìm theo ID

```js
// SELECT * FROM Tank WHERE id = 123
const tank = await Tank.findById(id);
console.log("Tank by ID:", tank);
```

### 🔶 Tìm kiếm với các Toán tử

- $eq (So sánh bằng)

```js
const tanks = await Tank.find({ size: { $eq: 'small' } });
```

- $ne (không bằng)

```js
const tanks = await Tank.find({ size: { $ne: 'small' } });
```

- $gt (lớn hơn) và $lt (nhỏ hơn)

```js
const tanks = await Tank.find({ createdDate: { $gt: new Date('2023-01-01') } });
```

- $gte (lớn hơn hoặc bằng) và $lte (nhỏ hơn hoặc bằng)

```js
const tanks = await Tank.find({
    createdDate: {
      $gte: new Date('2023-01-01'),
      $lte: new Date('2024-01-01')
    }
  });
```

- Toán tử $and

```js
const tanks = await Tank.find({ 
  $and: [
      { size: 'small' }, 
      { color: 'blue' }
    ] 
  });
```

- Toán tử $or

```js
 const tanks = await Tank.find({
   $or: [
      { size: 'small' },
      { color: 'blue' }
    ] 
  });
```

- Toán tử $or

```js
const tanks = await Tank.find({
   size: { 
      $not: { $eq: 'small' } } 
  });
```

- Toán tử: $in và $nin

```js
const tanks = await Tank.find({ size: { $in: ['small', 'medium'] } });

 const tanks = await Tank.find({ size: { $nin: ['small', 'medium'] } });
```

### 🔶 Cập nhật

- Cập nhật một tài liệu

```js
const updatedTank = await Tank.findByIdAndUpdate(id, 
  { 
    color: 'red' 
  },
  { new: true }, //Trả lại record sau khi update rồi
);

//UPDATE Tanks SET color = 'green' WHERE size = 'small' LIMIT 1;
const result = await Tank.updateOne({ size: 'small' }, { color: 'green' });

//UPDATE Tanks SET color = 'green' WHERE size = 'small' LIMIT 1;
const updatedTank = await Tank.findOneAndUpdate(
  { size: 'small' },
  { color: 'green' },
  { new: true } // Trả về tài liệu đã được cập nhật
);
```

- Cập nhật nhiều tài liệu

```js
// UPDATE Tanks SET color = 'green' WHERE size = 'small';
const wheres = { size: 'small' }
const payloads = { color: 'green' }
const result = await Tank.updateMany(wheres, payloads);
```

### 🔶 Xóa

- Xóa một document

```js
//DELETE FROM Tank WHERE id = 123
const deletedTank = await Tank.findByIdAndDelete(id);

//DELETE FROM Tanks WHERE size = 'small' LIMIT 1;
const result = await Tank.deleteOne({ size: 'small' });

//DELETE FROM Tanks WHERE size = 'small' LIMIT 1;
const deletedTank = await Tank.findOneAndDelete({ size: 'small' });
```

- Xóa nhiều documents

```js
//DELETE FROM Tank WHERE size = 'small'
const result = await Tank.deleteMany({ size: 'small' });
```

### 🔶 Nguồn tham chiếu

Xem thêm về select: <https://mongoosejs.com/docs/api/query.html#Query.prototype.select()>

---

## 💛 GROUP BY và Aggregation 

Chi tiết xem:

- https://mongoosejs.com/docs/api/aggregate.html#Aggregate()
- https://www.mongodb.com/docs/manual/core/aggregation-pipeline/
- https://www.mongodb.com/docs/manual/reference/aggregation/

Ví dụ 1: Tính tổng số lượng đơn hàng theo trạng thái

```js
const Order = require('./Order.model');

Order.aggregate([
    { $group: { _id: "$status", totalOrders: { $sum: 1 } } }
]).exec((err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
```

Ví dụ 2: Tính tổng doanh thu từ các đơn hàng đã hoàn thành

```js
const Order = require('./Order.model');

Order.aggregate([
    { $match: { status: "Completed" } },
    { $group: { _id: null, totalRevenue: { $sum: "$orderAmount" } } }
]).exec((err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
```

Ví dụ 3: Đếm số lượng sản phẩm theo mức giảm giá

```js
Product.aggregate([
    { $group: { _id: "$discount", totalProducts: { $sum: 1 } } }
]).exec((err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
```


---

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

thì ở productSchema bạn để một trường category như sau:

```js
const productSchema = new new mongoose.Schema({
  name: String,
  //tên trường đăt = tên Model Category nhưng viết thường
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
})
```

```js
// Lấy tất cả thông tin từ category
const product = await Product.find().populate('category').;

// Lấy tất cả thông tin từ category, loại trừ _v
const product = await Product.find().populate('category', '-_v');

//Chỉ lấy tên
const product = await Product.find().populate('category', 'name');

// Hoặc trong Product Model bạn sử dụng local Field categoryId
const products = await Product.find().populate({
    path: 'categoryId', // Tên trường trong Product Model
    model: 'Category' // Tên Model tham chiếu
});
```
---

Ngoài ra, Trường hợp category bạn đặt là `categoryID` thì để lấy được thông tin của danh mục bạn có thể sử dụng một tính năng đó là `virtuals Populate`

```js
//Cài thêm mongoose-lean-virtuals
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const productSchema = new mongoose.Schema({
  name: String,
  //tên trường đăt = tên Model Category nhưng viết thường
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

/* Khai báo khóa ngoại với Category Model */
productSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });
productSchema.plugin(mongooseLeanVirtuals);

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
};

```

Sau đó bạn dùng

```js
//Chỉ lấy tên
const product = await Product.find().populate('category', 'name').lean({virtuals: true})
//Hoặc
const product = await Product.find().populate({
  path: 'category',
  select: 'name'
}).lean({virtuals: true})
//Populate Có điều kiện ở collection cần populate
const product = await Product.find().populate({
  path: 'category',
  select: 'name -__v',
  match: { age: { $gte: 21 } },
}).lean({virtuals: true})
```



## 💛 Instance methods

Là một số phương thức được có sẵn của Document

- <https://mongoosejs.com/docs/api/document.html>
- https://mongoosejs.com/docs/api/schema.html#Schema.prototype.method()

Tự tạo một document instance method

Cú pháp: `Schema.methods`

Ví dụ

```js
// So sánh pass
// Usage: user.invalidPassword()
userSchema.methods.invalidPassword = function (req_password, user_password) {
  return bcrypt.compare(req_password, user_password);
};
//hoăc
userSchema.method('invalidPassword', function (req_password, user_password) {
  return bcrypt.compare(req_password, user_password);
})


// Tạo Token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, email: this.email, role: this.role },
    config.jwt.secure_key
  );
  return token;
};
```

- Lưu ý instance method không chấp nhận từ khóa `this` nên sử dụng function truyền thống để định nghĩa.

- Dùng để tạo ra một tính năng độc lập, không liên quan đến bên trong Model

```js
const user = await User.findById(id);
if (user) {
  const invalidPassword = user.invalidPassword(user.password,payload.password);
  ///Nó là một method instance nên dùng nó sau khi instance được khởi tạo
}
```


## 💛 Static

Dùng khi bạn cần tạo ra một chức năng (function), có sử dụng đến Model

```js
// Usage: Model.isEmailTaken()
userSchema.statics.isEmailTaken = async (email, excludeUserId) => {
  const user = await this.findOne({
    email,
    _id: {
      $ne: excludeUserId,
    },
  });
  return !!user;
};
```
Cách dùng

```javascript
//check email đã tồn tại chưa trước khi update
const isEmailExits = User.isEmailTaken(payload.email, currentUserId)
```

## 💛 Virtuals

Tạo ra một thuộc tính ảo.

Ví dụ đang có sẵn firstName và LastName, bạn không cần tạo thêm FullName.

```js
// Virtual for this genre instance fullName.
userSchema.virtual('fullName').get(function () {
  return this.fistName + ' ' + this.lastName;
});
```

Tạo một URL

```js
// Virtual for this genre instance URL.
userSchema.virtual('url').get(function () {
  return '/users/' + this._id;
});
```

Nếu bạn muốn các virtuals xuất hiện trong `console.log` và `object json` bạn cần thiết lập thêm

```javascript
{
  timestamps: false, //true tự tạo ra createAt và updateAt
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  toObject: { virtuals: true },
}
```

vào options của schema, sau đó khi truy vấn bạn sẽ thấy trường fullname xuất hiện.

## 💛 Query Helpers

Giúp bạn tự tạo cho mình một hàm truy vấn riêng.

Giúp bạn tạo ra cú pháp short hand, tránh lặp lại nhiều lần đoạn code dài dòng.

```js
// Or, Assign a function to the "query" object of our animalSchema
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};
```

Cách sử dụng

```js
User.find()
  .byName('fido')
  .exec((err, animals) => {
    console.log(animals);
  });
```

Tạo thuộc tính ảo cho Model

## 💛 Middleware

Mongoose cung cấp một số Middleware, giúp bạn can thiệp xử lý dữ liệu trước khi nó đã ghi vào Database

Xem chi tiết: <https://mongoosejs.com/docs/middleware.html>

Ví dụ

- Mã hóa password trước khi save xuống
- Convert ngày tháng sang kiểu khác

```js
userSchema.pre('save', async function (next) {
  const rounds = 10; // what you want number for round password
  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;

  this.createdAt = moment.utc(this.createdAt).format('YYYY-MM-DD hh:mm:ssZ');
  this.updatedAt = moment.utc(this.updatedAt).format('YYYY-MM-DD hh:mm:ssZ');

  next();
});
```

## 💛 TypeScript Support

Nếu code theo kiểu TypeScript thì xem link sau <https://mongoosejs.com/docs/typescript.html>

