
# Kết nối với SQL Server thuần

Doc: <https://github.com/tediousjs/node-mssql>
## 🌻Cài đặt

Thư viện SQL Server cho NodeJS

```bash
yarn add mssql
```

## 🌻Tạo một Database trong SQL Server

Tạo table Employees

```SQL
CREATE DATABASE AptechTEST;
GO
USE AptechTEST;
GO
CREATE TABLE employees (
  EmployeeID int NOT NULL,
  LastName nvarchar(255) DEFAULT NULL,
  FirstName nvarchar(255) DEFAULT NULL,
  BirthDate date DEFAULT NULL,
  Photo nvarchar(255) DEFAULT NULL,
  Notes nvarchar(max),
  NumberPhone NVARCHAR(120) NOT NULL,
  Email NVARCHAR(50) NOT NULL,
  Password NVARCHAR(255) NOT NULL
) ;
GO

INSERT INTO employees (EmployeeID, LastName, FirstName, BirthDate, Photo, Notes, NumberPhone, Email, Password) VALUES
(1, 'Davolio', 'Nancy', '1968-12-08', 'EmpID1.pic', 'Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of ''Toastmasters International''.', '123456789', 'nancy@example.com', 'password123'),
(2, 'Fuller', 'Andrew', '1952-02-19', 'EmpID2.pic', 'Andrew received his BTS commercial and a Ph.D. in international marketing from the University of Dallas. He is fluent in French and Italian and reads German. He joined the company as a sales representative, was promoted to sales manager and was then named vice president of sales. Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.', '987654321', 'andrew@example.com', 'password456'),
(3, 'Leverling', 'Janet', '1963-08-30', 'EmpID3.pic', 'Janet has a BS degree in chemistry from Boston College). She has also completed a certificate program in food retailing management. Janet was hired as a sales associate and was promoted to sales representative.', '555555555', 'janet@example.com', 'password789'),
(4, 'Peacock', 'Margaret', '1958-09-19', 'EmpID4.pic', 'Margaret holds a BA in English literature from Concordia College and an MA from the American Institute of Culinary Arts. She was temporarily assigned to the London office before returning to her permanent post in Seattle.', '111111111', 'margaret@example.com', 'passwordabc'),
(5, 'Buchanan', 'Steven', '1955-03-04', 'EmpID5.pic', 'Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree. Upon joining the company as a sales representative, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London, where he was promoted to sales manager. Mr. Buchanan has completed the courses ''Successful Telemarketing'' and ''International Sales Management''. He is fluent in French.', '999999999', 'steven@example.com', 'passworddef'),
(6, 'Suyama', 'Michael', '1963-07-02', 'EmpID6.pic', 'Michael is a graduate of Sussex University (MA, economics) and the University of California at Los Angeles (MBA, marketing). He has also taken the courses ''Multi-Cultural Selling'' and ''Time Management for the Sales Professional''. He is fluent in Japanese and can read and write French, Portuguese, and Spanish.', '777777777', 'michael@example.com', 'passwordxyz'),
(7, 'King', 'Robert', '1960-05-29', 'EmpID7.pic', 'Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan and then joining the company. After completing a course entitled ''Selling in Europe'', he was transferred to the London office.', '222222222', 'robert@example.com', 'password1234'),
(8, 'Callahan', 'Laura', '1958-01-09', 'EmpID8.pic', 'Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French.', '888888888', 'laura@example.com', 'password5678'),
(9, 'Dodsworth', 'Anne', '1969-07-02', 'EmpID9.pic', 'Anne has a BA degree in English from St. Lawrence College. She is fluent in French and German.', '333333333', 'anne@example.com', 'passwordabcd'),
(10, 'West', 'Adam', '1928-09-19', 'EmpID10.pic', 'An old chum.', '444444444', 'adam@example.com', 'passwordefgh');

GO
```

## 🌻 Setup kết nối

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

## 🌻 Sử dụng kết nối

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


##  🌻 Data Types

Xem: https://github.com/tediousjs/node-mssql#data-types


