
# Cấu trúc database online-shop 


## 💛 Xây dựng các Model MongoDB

Tiếp tục hoàn thiện các Models khác trong mô hình E-Commerce theo thứ tự lần lượt:


### 1. Employee Model

#### 🔹 Employee Schema 

| Id | Column Name | Data Type     | Null | Default | Constraint |
|----|-------------|---------------|------|---------|------------|
| 1  | firstName   | string(50)  |      |         |            |
| 2  | lastName    | string(50)  |      |         |            |
| 3  | email       | string(50)   |      |         | UNIQUE     |
| 4  | phoneNumber | string(50)   |      |         | UNIQUE     |
| 5  | address     | string(500) |  yes   |         |            |
| 6  | birthDay    | date      | yes  |         |            |
| 7  | password    | string(255) |      |         |            |
| 8  | photo       | string(255) | yes  |         |            |

#### 🔹 Bảo vệ mật khẩu với thư viện `bcrypt`

```bash
yarn add bcrypt
```
Xem cách sử dụng: <https://www.npmjs.com/package/bcrypt#user-content-usage>

Cách so khớp password: <https://www.npmjs.com/package/bcrypt#user-content-to-check-a-password>


### 2. Categories Model


| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | name        | string(100)  |      |     |         | UNIQUE     |
| 2  | description | string(500) | yes  |     |         |            |
| 3  | slug        | string(100) |      |     |         | UNIQUE     |


### 3. Suppliers Model

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | name        | string(100) |      |     |         |            |
| 2  | email       | string(50)   |      |     |         | UNIQUE     |
| 3  | phoneNumber | string(50)   |      |     |         | UNIQUE     |
| 4  | address     | string(500) |   yes   |     |         |            |
| 5  | slug        | string(100) |      |     |         | UNIQUE     |


### 4. Customers Model

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | firstName   | string(50)  |      |     |         |            |
| 2  | lastName    | string(50)  |      |     |         |            |
| 3  | email       | string(50)   |      |     |         | UNIQUE     |
| 4  | phoneNumber | string(50)   |      |     |         | UNIQUE     |
| 5  | address     | string(500) |      |     |         |            |
| 6  | birthDay    | date    | yes  |     |         |            |
| 7  | password    | string(255) |      |     |         |            |


### 5. Products Model


| Id | Column Name | Data Type     | Null | Key | Default | Constraint                  |
|----|-------------|---------------|------|-----|---------|-----------------------------|
| 1  | slug          | string(255)           |    |   |         | UNIQUE                  |
| 2  | name        | string(255) |      |     |         | UNIQUE                      |
| 3  | price       | number         |      |     |         | n > 0                       |
| 4  | discount    | number |      |     | 0       | 0 <= n <= 90                |
| 5  | stock       | number |      |     | 0       | n >= 0                      |
| 6  | description | string(max) | yes  |     |         |                             |
| 7  | categoryId  | ObjectId           |      | FK  |         | Refrence to Categories (Id) |
| 8  | supplierId  | ObjectId           |      | FK  |         | Refrence to Suppliers (Id)  |
| 9  | thumbnail   | string(255)           |      |   |         |   |

### 6. Orders Model


| Id | Column Name     | Data Type     | Null | Key | Default | Constraint                         |
|----|-----------------|---------------|------|-----|---------|------------------------------------|
| 1  | _id             | ObjectId           |      | PK  |         | AUTONUMBER                         |
| 2  | createdDate     | date     |      |     | NOW     |                                    |
| 3  | shippedDate     | date     | yes  |     |         | n < CreatedDate                    |
| 4  | status          | string(50)   |      |     | WAITING | n in [WAINTING, COMPLETED, CANCEL] |
| 5  | description     | string(max) |      |     |         |                                    |
| 6  | shippingAddress | string(500) | yes  |     |         |                                    |
| 7  | shippingCity    | string(50)  |      |     |         |                                    |
| 8  | paymentType     | string(20)   |      |     | CASH    | n in [CASH, CREDIT CARD]           |
| 9  | customerId      | ObjectId           |      | FK  |         | Refrence to Customers (Id)         |
| 10 | employeesId     | ObjectId           |      | FK  |         | Refrence to Employees (Id)         |

và trường orderDetails là subDocument của Order

| Id | Column Name | Data Type     | Null | Key     | Default | Constraint                |
|----|-------------|---------------|------|---------|---------|---------------------------|
| 1  | productId   | ObjectId           |      | PK + FK |         | Refrence to Products (Id) |
| 2  | quantity    | number |      |         |         | n > 0                     |
| 3  | price       | number |      |         |         | n > 0                     |
| 4  | discount    | number |      |         |         | 0 <= n <=90               |


***

### 💛 Mockup Data to MongoDB

Sử dụng thư viện <https://fakerjs.dev> để tạo các Data ảo một cách nhanh chóng

## 💛 Xây dựng các Table SQL Server
### Categories

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(50)  |      |     |         | UNIQUE     |
| 3  | Description | nvarchar(500) | yes  |     |         |            |
| 4  | Slug        | nvarchar(255) |      |     |         | UNIQUE     |

### Suppliers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(100) |      |     |         |            |
| 3  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 4  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 5  | Address     | nvarchar(500) |      |     |         |            |


### Customers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | FirstName   | nvarchar(50)  |      |     |         |            |
| 3  | LastName    | nvarchar(50)  |      |     |         |            |
| 4  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 5  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 6  | Address     | nvarchar(500) |      |     |         |            |
| 7  | Birthday    | datetime      | yes  |     |         |            |
| 8  | Password    | nvarchar(255) |      |     |         |            |

### Employees (or Users)

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | FirstName   | nvarchar(50)  |      |     |         |            |
| 3  | LastName    | nvarchar(50)  |      |     |         |            |
| 4  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 5  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 6  | Address     | nvarchar(500) |      |     |         |            |
| 7  | Birthday    | datetime      | yes  |     |         |            |
| 8  | Password    | nvarchar(255) |      |     |         |            |
| 9  | Photo       | nvarchar(255) | yes  |     |         |            |

### Products

| Id | Column Name | Data Type     | Null | Key | Default | Constraint                  |
|----|-------------|---------------|------|-----|---------|-----------------------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER                  |
| 2  | Name        | nvarchar(255) |      |     |         | UNIQUE                      |
| 3  | Price       | money         |      |     |         | n > 0                       |
| 4  | Discount    | decimal(18,2) |      |     | 0       | 0 <= n <= 90                |
| 5  | Stock       | decimal(18,2) |      |     | 0       | n >= 0                      |
| 6  | Description | nvarchar(max) | yes  |     |         |                             |
| 7  | CategoryId  | int           |      | FK  |         | Refrence to Categories (Id) |
| 8  | SupplierId  | int           |      | FK  |         | Refrence to Suppliers (Id)  |
| 9  | Slug        | nvarchar(255) |      |     |         |  UNIQUE                     |
| 10  | Photo      | nvarchar(255) | yes  |     |         |                             |
### Orders


| Id | Column Name     | Data Type     | Null | Key | Default | Constraint                         |
|----|-----------------|---------------|------|-----|---------|------------------------------------|
| 1  | Id              | int           |      | PK  |         | AUTONUMBER                         |
| 2  | CreatedDate     | datetime      |      |     | NOW     |                                    |
| 3  | ShippedDate     | datetime      | yes  |     |         | n < CreatedDate                    |
| 4  | Status          | varchar(50)   |      |     | WAITING | n in [WAINTING, COMPLETED, CANCEL] |
| 5  | Description     | nvarchar(max) |      |     |         |                                    |
| 6  | ShippingAddress | nvarchar(500) | yes  |     |         |                                    |
| 7  | ShippingCity    | nvarchar(50)  |      |     |         |                                    |
| 8  | PaymentType     | varchar(20)   |      |     | CASH    | n in [CASH, CREDIT CARD]           |
| 9  | CustomerId      | int           |      | FK  |         | Refrence to Customers (Id)         |
| 10 | EmployessId     | int           |      | FK  |         | Refrence to Employees (Id)         |

### Order Details

| Id | Column Name | Data Type     | Null | Key     | Default | Constraint                |
|----|-------------|---------------|------|---------|---------|---------------------------|
| 1  | OrderId     | int           |      | PK + FK |         | Refrence to Orders (Id)   |
| 2  | ProductId   | int           |      | PK + FK |         | Refrence to Products (Id) |
| 3  | Quantity    | decimal(18,2) |      |         |         | n > 0                     |
| 4  | Price       | decimal(18,2) |      |         |         | n > 0                     |
| 5  | Discount    | decimal(18,2) |      |         |         | 0 <= n <=90               |


