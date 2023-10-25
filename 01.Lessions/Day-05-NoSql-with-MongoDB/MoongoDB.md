
# 💛 Using MoongoDB

Chi tiết xem: <https://www.w3schools.com/nodejs/nodejs_mongodb.asp>

Để kết nối thư viện MongoDB với Express.js, bạn cần thực hiện các bước sau:

1. Cài đặt MongoDB và thư viện MongoDB trong dự án của bạn bằng cách chạy lệnh sau trong terminal:

```bash
npm install mongodb
```
2. Kết nối express với mongodb

Tạo file constants/dbSetting.ts

```js
export default {
    CONNECTION_STRING: 'mongodb://127.0.0.1:27017/AptechTest',
    DATABASE_NAME: 'AptechTest',
  };
```

Với Database bạn phải tạo trước trong MongoPass

Tại một routes bất kỳ như routes/users.router.ts

```js
import express  from "express";
const router = express.Router();
import { CONNECTION_STRING, DATABASE_NAME }from "../constants/dbSettings";
const { MongoClient,ObjectId } = require("mongodb");

/* get All Users */
router.get("/", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const users = await db.collection("users").find({}).toArray();
    client.close();
    res.status(200).json(users);
  } catch (error) {
    next(error)
  }
});
export default = router;
```

Trong ví dụ trên, chúng ta đã truy vấn tất cả các tài khoản người dùng từ bảng `users` trong cơ sở dữ liệu và trả về kết quả dưới dạng JSON.

Chúng ta có các API khác như sau:

```js

/* Find a user by ID */
router.get("/:id", async (req, res, next) => {
    try {
      const client = await MongoClient.connect(CONNECTION_STRING);
      const db = client.db(DATABASE_NAME);
      const {id} = req.params;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const user = await db.collection("users").findOne(query);
      client.close();
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
});

/* Thêm mới 1 User */
router.post("/", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const newUser = req.body; // Assume the new user data is in the request body
    const result = await db.collection("users").insertOne(newUser);
    client.close();
    res.status(201).json(result.ops[0]);
  } catch (error) {
    next(error);
  }
});

/* Update user */

router.put("/:id", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const { id } = req.params;
    const updatedUser = req.body; // Assume the updated user data is in the request body
    const query = { _id: new ObjectId(id) };
    const update = { $set: updatedUser };
    const result = await db.collection("users").updateOne(query, update);
    client.close();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/* Xóa 1 user */
router.delete("/:id", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("users").deleteOne(query);
    client.close();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
```

Xem thêm: Danh sách Collection Methods:  <https://www.mongodb.com/docs/manual/reference/method/js-collection/>

Kết luận: Cứ mỗi API chúng ta phải tạo ra một kết nối, xử lý dữ liệu, trả về response rồi đóng kết nối.

Công việc đó cứ lặp đi lặp lại ở tất các các API

Thay vì thì chúng ta có thư viện bổ trợ, giúp code gọn hơn, dễ dùng hơn là Mongoose

