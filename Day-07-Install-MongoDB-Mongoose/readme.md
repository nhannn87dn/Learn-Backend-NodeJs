# MongoDB and Mongoose

Quản lý CSDL No SQL với MongoDB và Mongoose

## 💛 Cài đặt MongoDB

To be able to experiment with the code examples, you will need access to a MongoDB database.

You can download a free MongoDB database at https://www.mongodb.com.

> <https://www.mongodb.com/try/download/community>

Install (MacOS):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/>

Install (Windows):

> <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/>

Compass Tool:

> <https://www.mongodb.com/products/compass>

Extension for VS Code:

> <https://www.mongodb.com/products/vs-code>

PaaS: Get started right away with a MongoDB cloud service at https://www.mongodb.com/cloud/atlas.

---

## 💛 Install MongoDB driver and Mongoose

```bash
npm install mongoose --save
```

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

## 💛 Mongoose Built-in Validators

<https://mongoosejs.com/docs/validation.html#built-in-validators>

## 💛 Mongoose Model

### Data Model Design

Đối chiếu với SQL thì trong MongoDB (No SQL) thì một Database được gọi là **Document**, các Table thì gọi là Collection.

Cấu trúc của một Document sẽ được quyết định bởi 2 kiểu:

- embed
- use references

Data Model Design: <https://www.mongodb.com/docs/manual/core/data-model-design/#data-model-design>
Data Model: <https://www.mongodb.com/docs/manual/applications/data-models/>
