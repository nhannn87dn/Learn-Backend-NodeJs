# MongoDB

Tiếp tục hoàn thiện các Models khác trong mô hình E-Commerce theo thứ tự lần lượt:

## 💛 Xây dựng các Models

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

## 💛 Mockup Data to MongoDB

Sử dụng thư viện <https://fakerjs.dev> để tạo các Data ảo một cách nhanh chóng
