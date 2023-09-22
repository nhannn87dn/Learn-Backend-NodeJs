
# Cấu trúc database online-shop

## Categories

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(50)  |      |     |         | UNIQUE     |
| 3  | Description | nvarchar(500) | yes  |     |         |            |

## Suppliers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(100) |      |     |         |            |
| 3  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 4  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 5  | Address     | nvarchar(500) |      |     |         |            |


## Customers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | FirstName   | nvarchar(50)  |      |     |         |            |
| 3  | LastName    | nvarchar(50)  |      |     |         |            |
| 4  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 5  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 6  | Address     | nvarchar(500) |      |     |         |            |
| 7  | Birthday    | datetime      | yes  |     |         |            |

## Employees (or Users)

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

## Products

| Id | Column Name | Data Type     | Null | Key | Default | Constraint                  |
|----|-------------|---------------|------|-----|---------|-----------------------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER                  |
| 2  | Name        | nvarchar(100) |      |     |         |                             |
| 3  | Price       | money         |      |     |         | n > 0                       |
| 4  | Discount    | decimal(18,2) |      |     | 0       | 0 <= n <= 90                |
| 5  | Stock       | decimal(18,2) |      |     | 0       | n >= 0                      |
| 6  | Description | nvarchar(max) | yes  |     |         |                             |
| 7  | CategoryId  | int           |      | FK  |         | Refrence to Categories (Id) |
| 8  | SupplierId  | int           |      | FK  |         | Refrence to Suppliers (Id)  |

## Orders


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

## Order Details

| Id | Column Name | Data Type     | Null | Key     | Default | Constraint                |
|----|-------------|---------------|------|---------|---------|---------------------------|
| 1  | OrderId     | int           |      | PK + FK |         | Refrence to Orders (Id)   |
| 2  | ProductId   | int           |      | PK + FK |         | Refrence to Products (Id) |
| 3  | Quantity    | decimal(18,2) |      |         |         | n > 0                     |
| 4  | Price       | decimal(18,2) |      |         |         | n > 0                     |
| 5  | Discount    | decimal(18,2) |      |         |         | 0 <= n <=90               |


