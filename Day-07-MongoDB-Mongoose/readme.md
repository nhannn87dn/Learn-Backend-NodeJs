# MongoDB and Mongoose

![mongodb](https://images.viblo.asia/29322fc4-a1b0-4416-9dce-0d4b34843cf6.png)

## 💛 MongoDB là gì ?

- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng.
- MongoDB là một database hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON thay vì dạng bảng như CSDL quan hệ nên truy vấn sẽ rất nhanh.
- Với CSDL quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như MySQL hay SQL Server...) sử dụng các bảng để lưu dữ liệu thì với MongoDB chúng ta sẽ dùng khái niệm là collection thay vì bảng
- So với RDBMS thì trong MongoDB collection ứng với table, còn document sẽ ứng với row , MongoDB sẽ dùng các document thay cho row trong RDBMS.
- Các collection trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo một cấu trúc nhất định.
- Thông tin liên quan được lưu trữ cùng nhau để truy cập truy vấn nhanh thông qua ngôn ngữ truy vấn MongoDB

## 💛 Ưu điểm của mongoDB

- Dữ liệu lưu trữ phi cấu trúc, không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- Dữ liệu được caching (ghi đệm) lên RAM, hạn chế truy cập vào ổ cứng nên tốc độ đọc và ghi cao

## 💛 Nhược điểm của MongoDB

- Không ứng dụng được cho các mô hình giao dịch nào có yêu cầu độ chính xác cao do không có ràng buộc.
- Không có cơ chế transaction (giao dịch) để phục vụ các ứng dụng ngân hàng.
- Dữ liệu lấy RAM làm trọng tâm hoạt động vì vậy khi hoạt động yêu cầu một bộ nhớ RAM lớn.
- Mọi thay đổi về dữ liệu mặc định đều chưa được ghi xuống ổ cứng ngay lập tức vì vậy khả năng bị mất dữ liệu từ nguyên nhân mất điện đột xuất là rất cao.

## 💛 Khi nào sử dụng MongoDB?

- Quản lý và truyền tải content – Quản lý đa dạng nhiều product của content chỉ trong một kho lưu trữ data cho phép thay đổi và phản hồi nhanh chóng mà không chịu thêm phức tạp thêm từ hệ thống content.
- Cấu trúc Mobile và Social – MongoDB cung cấp một platform có sẵn, phản xạ nhanh, và dễ mở rộng cho phép rất nhiều khả năng đột phá, phân tích real-time, và hỗ trợ toàn cầu.
- Quản lý data khách hàng – Tận dụng khả năng query nhanh chóng cho phân tích real-time trên cơ sở dữ liệu người dùng cực lớn vớ các mô hình data phức tạp bằng các schema linh hoạt và tự động sharding cho mở rộng chiều ngang.

## 💛 Cài đặt MongoDB

To be able to experiment with the code examples, you will need access to a MongoDB database.

You can download a free MongoDB database at https://www.mongodb.com.

> <https://www.mongodb.com/try/download/community>

Install (MacOS):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/>

Install (Windows):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/>

Compass Tool: Công cụ để quản lý MoogoDB bằng giao diện đồ họa

> <https://www.mongodb.com/products/compass>

Extension for VS Code:

> <https://www.mongodb.com/products/vs-code>

PaaS: Get started right away with a MongoDB cloud service at https://www.mongodb.com/cloud/atlas.

## 💛 Install MongoDB driver and Mongoose

Sử dụng MongoDB qua thư viện Mongoose giúp thao tác dễ hơn về mặt cú pháp

```bash
npm install mongoose --save
yarn add mongoose --save
```

## 💛 Kết nối với Database

Đưa đoạn code này vào server.js

```js
/// Start the server
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect('mongodb://127.0.0.1:27017/myapp',mongooseDbOptions)
then(()=>{
  console.log("Connected to MongoDB");
  //should listen app here
})
catch((err)=>{
    console.error("Failed to Connect to MongoDB", err);
});
```

Tips: Bạn có thể đưa đoạn code khởi tạo server của Express vào chổ `//should listen app here` để đảm bảo rằng. Phải kết nối server Mongoo thành công thì mới khởi tạo server NodeJs.

## 💛 Mongoose SchemaTypes

Tham khảo: <https://mongoosejs.com/docs/schematypes.html>

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
- Schema

## 💛Tạo một Model Schema với Mongoose

Doc: <https://mongoosejs.com/docs/guide.html#definition>

Tạo thư mục models, trong thư mục này tạo file user.model.js

Cú pháp

```js
new Schema({..}, options);

// or
const schema = new Schema({..});
schema.set(option, value);

```

Xem các options ở link sau: <https://mongoosejs.com/docs/guide.html#options>

Ví dụ về User Schema:

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    isEmailVerified: Boolean,
  },
  { timestamps: true }
);
// Tạo Model User
const User = new mongoose.model('User', userSchema);
module.exports = User;
```

Công việc nay ví như bạn đi tạo một table User, rồi đi thêm các trường cho table User bên SQL vậy.



## 💛 Database Relationships

Trước khi đi tìm hiểu **Data Model Design** chúng ta cần biết mối quan hệ trong CSDL

### 🔶 One to One - Một một

Kiểu quan hệ một một (one-to-one relationship) là một kiểu quan hệ giữa hai thực thể (entities) trong cơ sở dữ liệu, trong đó `mỗi` thực thể của một bảng dữ liệu chỉ liên kết với `MỘT` thực thể duy nhất của bảng dữ liệu khác. Nói cách khác, mỗi thực thể của bảng A chỉ được liên kết với `MỘT` thực thể duy nhất của bảng B, và ngược lại.

Ví dụ, trong một cơ sở dữ liệu quản lý nhân viên, mỗi nhân viên chỉ có một tài khoản lương duy nhất và mỗi tài khoản lương chỉ thuộc về một nhân viên duy nhất. Đây là một mối quan hệ một-một giữa bảng "Employees" và bảng "SalaryAccounts".

Ví dụ QL Sinh viên: Mỗi sinh viên chỉ có một hồ sơ sinh viên duy nhất và mỗi hồ sơ sinh viên chỉ thuộc về một sinh viên duy nhất. Đây là một mối quan hệ một-một giữa bảng "Students" và bảng "StudentProfiles".

### 🔶 One to Many - Một nhiều


Kiểu quan hệ một nhiều (one-to-many relationship) là một kiểu quan hệ giữa hai thực thể trong cơ sở dữ liệu, trong đó `MỘT` thực thể của bảng dữ liệu có thể được liên kết với `NHIỀU` thực thể của bảng dữ liệu khác, nhưng mỗi thực thể của bảng dữ liệu khác lại chỉ liên kết với một thực thể duy nhất của bảng dữ liệu đầu tiên.

Ví dụ, trong một cơ sở dữ liệu quản lý khách sạn, một khách sạn có thể có nhiều phòng, nhưng mỗi phòng chỉ thuộc về một khách sạn duy nhất. Đây là một mối quan hệ một nhiều giữa bảng "Hotels" và bảng "Rooms".

### 🔶 Many to Many - Nhiều nhiều

Kiểu quan hệ nhiều nhiều (many-to-many relationship) là một kiểu quan hệ giữa hai bảng dữ liệu trong cơ sở dữ liệu, trong đó mỗi thực thể của bảng dữ liệu A có thể liên kết với nhiều thực thể của bảng dữ liệu B, và mỗi thực thể của bảng dữ liệu B cũng có thể liên kết với nhiều thực thể của bảng dữ liệu A.

Ví dụ, trong một cơ sở dữ liệu quản lý đơn hàng trực tuyến, một đơn hàng có thể có nhiều sản phẩm, và một sản phẩm cũng có thể xuất hiện trong nhiều đơn hàng khác nhau. Đây là một mối quan hệ nhiều nhiều giữa bảng "Orders" và bảng "Products".


## 💛 Data Model Design

Trong NoSQL, khái niệm bảng được thay thế bằng khái niệm collection (tập hợp). Một collection trong NoSQL tương đương với một bảng trong hệ quản trị cơ sở dữ liệu quan hệ (RDBMS).

Trong NoSQL, document là một đối tượng cơ bản trong cơ sở dữ liệu, tương đương với một bản ghi trong hệ quản trị cơ sở dữ liệu quan hệ (RDBMS). Một document thường được biểu diễn dưới dạng các cặp trường (field) và giá trị tương ứng, và được lưu trữ trong các collection.

Dựa trên mối quan hệ giữa CSDL, Cấu trúc của một Document sẽ được quyết định bởi 2 kiểu:

- embed
- use references

Data Model Design: <https://www.mongodb.com/docs/manual/core/data-model-design/#data-model-design>

Data Model: <https://www.mongodb.com/docs/manual/applications/data-models/>

## 💛 Mongoose Basic Queries 

Doc: <https://mongoosejs.com/docs/queries.html>


## 💛 Mongoose Built-in Validators

Doc: <https://mongoosejs.com/docs/validation.html#built-in-validators>

Trước khi dữ liệu được ghi vào Database, Mongosee cho phép chúng ta validate một lần nữa.

Thực hiện ngay khi tạo Schema. Chúng ta sửa userShema lại có validation như sau:

```js
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: [6, 'Too few eggs'],
      max: [12, 'Only allow Max 12 characters'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'booking', 'user'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
  },
  { timestamps: true }
);
```

### Custom Validators

Nếu bạn thấy các tính năng validate có sẵn không đáp ứng được yêu cầu thì bạn có thể tự tạo cho mình một phương thức validation riêng

Ví dụ: Check số điện thoại đúng định dạng yêu cầu không

```js
const validator = require('validator');

const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
});
```


## 💛 Instance methods

Là một số phương thức được có sẵn của Document

<https://mongoosejs.com/docs/api/document.html>

Tự tạo một document instance method

Cú pháp: `Schema.methods`

Ví dụ

```js
// So sánh pass
// Usage: user.invalidPassword()
userSchema.methods.invalidPassword = function (req_password, user_password) {
  return bcrypt.compare(req_password, user_password);
};
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

## 💛 Virtuals

Tạo ra một thuộc tính ảo.

Ví dụ đang có sẳn firstName và LastName, bạn không cần tạo thêm FullName.

```js
// Virtual for this genre instance fullName.
userSchema.virtual('fullName').get(function () {
  return this.fistName + " " + this.lastName;
});
```
Tạo một URL

```js
// Virtual for this genre instance URL.
userSchema.virtual('url').get(function () {
  return '/users/' + this._id;
});
```

## 💛 Query Helpers

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


