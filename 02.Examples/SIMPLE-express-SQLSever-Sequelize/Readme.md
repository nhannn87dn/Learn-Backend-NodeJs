# SIMPLE-express-SQLSever-Sequelize


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

Tạo một tệp employee.model.js (hoặc employee.model.ts nếu bạn đang sử dụng TypeScript) để định nghĩa Employee Entity (Model):

```js
const { DataTypes } = require('sequelize');
/**
 * Data Types
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 * 
 */
module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
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
      //tableName: 'Employees', //Nếu không khai báo thì tên table = tên Model (thêm s số nhiều)
      timestamps: true, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    }
  );

  return Employee;
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

