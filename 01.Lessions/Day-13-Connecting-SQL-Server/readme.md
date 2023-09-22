# Using MongoDB and SQL Server

Trong bài học này chúng ta tìm hiểu các vấn đề sau:

- Connecting to SQL Server 
- PUT and PATH



## 💛 Connecting to SQL Server 

Học cách kết nối với Database để lấy dữ liệu sau đó trả về cho Clients

### 🔶 Kết nối với SQL Server thuần

Doc: <https://github.com/tediousjs/node-mssql>
#### 🌻Cài đặt

Thư viện SQL Server cho NodeJS

```bash
yarn add mssql
```

#### 🌻Tạo một Database trong SQL Server

Tạo table Users/Employees 

```SQL
CREATE DATABASE AptechTEST;
GO
USE AptechTEST;
GO
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY,
  firstName NVARCHAR(20) NOT NULL,
  lastName NVARCHAR(20) NOT NULL,
  numberPhone NVARCHAR(120) NOT NULL,
  email NVARCHAR(50) NOT NULL,
  address NVARCHAR(50) NULL,
  birthday DATE NULL,
  password NVARCHAR(255) NOT NULL
);
GO

INSERT INTO Users (firstName, lastName, numberPhone, email, address, birthday, password)
VALUES
  ('John', 'Doe', '1234567890', 'john.doe@example.com', '123 Main St', '1990-01-01', 'password1'),
  ('Jane', 'Smith', '0987654321', 'jane.smith@example.com', '456 Elm St', '1995-02-15', 'password2'),
  ('Michael', 'Johnson', '9876543210', 'michael.johnson@example.com', '789 Oak Ave', '1985-07-10', 'password3'),
  ('Emily', 'Williams', '0123456789', 'emily.williams@example.com', '321 Pine Blvd', '1992-12-05', 'password4'),
  ('David', 'Brown', '5678901234', 'david.brown@example.com', '654 Cedar Ln', '1998-09-20', 'password5');
GO
```

#### 🌻 Setup kết nối

Trong folder config tạo file dbPool.js tạo kết nối và tái sử dụng kết nối rãnh

```js
const sql = require('mssql');

// Cấu hình kết nối
const dbConfig = {
  user: 'nhan',
  password: '123456789',
  server: 'NHAN2', // Thay thế bằng địa chỉ server của bạn
  database: 'AptechTEST',
  options: {
    encrypt: false, // Tùy chọn bảo mật (tuỳ theo cấu hình của SQL Server)
  },
  pool: {
    max: 10, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    idleTimeoutMillis: 30000, // Thời gian tối đa để kết nối trong pool ở trạng thái chờ
  },
};

// Tạo global pool
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Xử lý lỗi kết nối
poolConnect.catch(err => {
  console.error('Error connecting to SQL Server:', err);
});

// Đảm bảo rằng pool đã kết nối trước khi xuất module
poolConnect.then(() => {
  console.log('Connected to SQL Server');
}).catch(err => {
  console.error('Error connecting to SQL Server:', err);
});

module.exports = {
    pool,
    sql
};

```

#### 🌻 Sử dụng kết nối

Trong các routes bạn dùng nó như sau:

```js
const {pool,sql} = require('../configs/dbPool');

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res,next) => {
  try {
    /**
     * Sử dụng cú pháp SQL server thuần tùy ở đây
     */
    const result = await pool.request().query('SELECT * FROM users');
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result.recordset
    });
    
  } catch (err) {
    next(err);
  }

});
```


Tạo đầy đủ CURD API với Users/Employees với SQL Server

- GET : api/v1/users
- GET : api/v1/users/:id
- POST : api/v1/users/:id
- PUT : api/v1/users/:id
- DELETE: api/v1/users/:id


####  🌻 Data Types

Xem: https://github.com/tediousjs/node-mssql#data-types


## 💛 PUT and PATH

Trong RESTful API, PUT và PATCH là hai phương thức HTTP khác nhau được sử dụng để cập nhật tài nguyên. 

Có rất nhiều tranh luận nên dùng PUT hay PATH

|                    | PUT | PATCH |
|--------------------|-----|-------|
| Partial Updates    | ❌   | ✔️     |
| Bandwidth          | ⬆️   | ⬇️     |
| Creates a resource | ✔️   | ❌     |
| Idempotent         | ✔️   | ❌     |
| Safe               | ❌   | ❌     |

Tham khảo: <https://josipmisko.com/posts/patch-vs-put-rest-api>


Dưới đây là sự khác biệt giữa PUT và PATCH:

1. PUT (Cập nhật toàn bộ tài nguyên):
   - Phương thức PUT được sử dụng để cập nhật toàn bộ tài nguyên hoặc tạo mới nếu tài nguyên chưa tồn tại.
   - Khi sử dụng PUT, bạn gửi một yêu cầu cập nhật hoàn toàn và ghi đè lên tài nguyên hiện có. Điều này có nghĩa là tất cả các trường dữ liệu của tài nguyên sẽ được thay thế bằng dữ liệu mới được gửi.
   - Nếu bạn chỉ gửi một phần của tài nguyên trong yêu cầu PUT, những phần không được gửi sẽ bị xóa hoặc trở thành giá trị mặc định (nếu có) tuỳ thuộc vào ứng dụng.

Ví dụ có một record với thông tin sau:

```json

{
    "id": 1,
    "name": "John Smith",
    "age": 25,
    "skill": "Java, PHP"
}

```
Bây giờ muốn bổ sung thêm skill cho id : 1

Request: PUT /users/1

Request payload:

```json
"skill": "Java, PHP, Python, JavaScript"
```

Bây giờ mình kiểm tra lại xem thông tin John đã được cập nhật chưa.

Request: GET /user/1
Response:

```json
"skill": "Java, PHP, Python, JavaScript"
```

Cập nhật rồi, nhưng trường name, và age đã biến mất

2. PATCH (Cập nhật một phần tài nguyên):
   - Phương thức PATCH được sử dụng để cập nhật một phần của tài nguyên.
   - Khi sử dụng PATCH, bạn chỉ cần gửi các trường dữ liệu cần cập nhật trong yêu cầu. Các trường dữ liệu khác của tài nguyên sẽ không bị thay đổi.
   - Phương thức PATCH cho phép bạn thực hiện các thay đổi nhỏ mà không cần gửi lại toàn bộ tài nguyên. Điều này hữu ích khi bạn chỉ muốn cập nhật một số trường dữ liệu mà không ảnh hưởng đến các trường khác.


Cũng với ví dụ trên thực hiện với PATH thì sau khi cập nhật bạn nhật được response

```json

{
    "id": 1,
    "name": "John Smith",
    "age": 25,
    "skill": "Java, PHP, Python, JavaScript"
}

```

==> PATCH chỉ cập nhật những field được yêu cầu thay vì cập nhật toàn bộ.



### 🔶 Kết nối với SQL Server với ORM Tools

#### 🌻 ORM là gì ?

ORM viết tắt của "Object-Relational Mapping", là một mô hình lập trình được sử dụng để ánh xạ dữ liệu giữa hệ quản trị cơ sở dữ liệu (Relational Database Management System - RDBMS) và các đối tượng trong các ngôn ngữ lập trình hướng đối tượng (như Java, Python, C#, TypeScript, và nhiều ngôn ngữ khác). Mục tiêu chính của ORM là giúp đơn giản hóa việc làm việc với cơ sở dữ liệu bằng cách biến đổi dữ liệu được lưu trữ trong các bảng cơ sở dữ liệu thành các đối tượng có thể được truy cập và quản lý bằng mã lập trình.

Có rất nhiều Tools ORM: Sequelize, Prisma, TypeORM ...hỗ trợ javascript và TypeScript

Trong bài học này chúng ta làm quen với [Sequelize](https://sequelize.org/docs/v6/getting-started/)


#### 🌻 Step 1: install

Doc: https://sequelize.org/docs/v6/getting-started/#installing

```bash
npm install --save sequelize
yarn add sequelize
```

Cài đặt Driver cho loại DATABASE

```bash
npm install --save tedious # Microsoft SQL Server
yarn add tedious # Microsoft SQL Server
```

#### 🌻 Step 2: Tạo Models

Tạo một tệp user.model.js (hoặc user.model.ts nếu bạn đang sử dụng TypeScript) để định nghĩa User Entity (Model):

```js
const { DataTypes } = require('sequelize');
/**
 * Data Types
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 * 
 */
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      numberPhone: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      //tableName: 'Users', //Nếu không khai báo thì tên table = tên Model (thêm s số nhiều)
      timestamps: true, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    }
  );

  return User;
};

```

Xem thêm tài liệu:

- https://sequelize.org/docs/v6/core-concepts/model-basics/

- https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types


#### 🌻 Kết nối với SQL Server

Trong folder src/models tạo file index.js

```js
const { Sequelize } = require('sequelize');
//Import thông tin cấu hình database server
const dbConfig = require('../configs/db')
const sequelize = new Sequelize(dbConfig);

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

//Kết nối các Models (Bảng) tại đây
models.User = require('./user.model')(sequelize, Sequelize);
//... thêm vào sau các Model khác

module.exports = models;

```

file db.js

Bạn cần chuẩn bị một account xác thực SQL Authentication

```js
const dbConfig = {
    dialect: 'mssql',
    host: 'NHAN2',
    port: 1433,
    username: 'nhan',
    password: '123456789',
    database: 'myStore', //Bạn phải tạo Database trước
    dialectOptions: {
        options: {
          encrypt: false, 
        },
    },
}

module.exports = dbConfig;
```

Lưu ý bạn phải tạo Database trước và không cần tạo bảng, Kết nối thành công thì code sẽ tự động tạo các table dựa trên các Models mà bạn đã cấu hình.


file server.js sửa lại như sau

```js
require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 9000;
const models = require('./src/models');


/**
 * Tạo hàm kiểm tra db kết nối thành công chưa
 * Kết nối Database server OK --> start server express
 */
const initApp = async () => {
  console.log("Testing the database connection..");

  try {
     //test kết nối
     await models.sequelize.authenticate();
     console.log("Connection has been established successfully.");

     
    // Đồng bộ hóa cơ sở dữ liệu và khởi tạo các bảng nếu chưa tồn tại
    /**
     * sync() , tạo mới nếu chưa, còn rồi thì thôi
     * sync({ force: true }), xóa cũ tạo mới lại
     * sync({ alter: true }), check và đồng bộ thay đổi
     */
    models.sequelize.sync({ alter: true }).then(() => {
      console.log('Database synced');
    }).catch((error) => {
      console.error('Error syncing database:', error);
    });

    //Khởi tạo server Express
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });

    
  } catch (error) {
     console.error("Unable to connect to the database:", error.original);
  }
};

initApp();

```

Sau khi tạo xong, bạn thử chạy server lên

```bash
yarn dev
```

Check xem trong Database server có được đồng bộ không, nếu chưa tạo tables thì sẽ được tạo mới.

Xem ví dụ: 02-Examples\SIMPLE-express-SQLSever-Sequelizes


## 💛 SQL Server with TypeORM library