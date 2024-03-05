
# Cấu trúc database BikeStore

Dưới đây là các table được thiết kế cho CSDL SQL Server, hay chuyển nó thành các Model trong MongoDB theo quy tắc

- Đặt tên Model: Tên các table ở dạng số ít
- Tên Trường: Chuyển sang kiểu camelCase

## 💛 Xây dựng các Table 

Để đơn giản hơn cho dự án:
- Đã loại bỏ table `stocks` và `stores`
- Trường số lượng sản phẩm được đưa vào table products với tên `stock`

## 💥 Table  categories

| No. | FieldName     | DataType | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint      | Notes |
| --- | ------------- | -------- | -------- | ---------- | ----------- | ----------- | ------------ | --------------- | ----- |
| 1   | category_id   | INT      |          |            | Primary Key |             |              | IDENTITY (1, 1) |       |
| 2   | category_name | NVARCHAR | 50       |            |             |             |              | UNIQUE          |       |
| 3   | description   | NVARCHAR | 500      | YES        |             |             |              |                 |       |
| 4   | slug   | NVARCHAR | 50      |         |             |             |              |   UNIQUE         |       |


Trong đó `slug` được tạo ra tự động từ  `category_name` nếu nó không được điền.

Sử dụng thư viện `slugify` để convert `category_name` thành `slug`

**Sample Data Categories**

| category_id | category_name | description |
|-------------|---------------|-------------|
| 1           | Road          | Bicycles designed for paved roads |
| 2           | Mountain      | Off-road and trail bicycles |
| 3           | Hybrid        | Versatile bikes for various terrains |
| 4           | Cruiser       | Comfortable and stylish bikes for leisurely rides |
| 5           | Electric      | Bicycles powered by electric motors |

## 💥 Table  brands

| No. | FieldName   | DataType | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint     | Notes  |
|-----|-------------|----------|----------|------------|-------------|-------------|--------------|----------------|--------|
| 1   | brand_id    | INT      |          |            | Primary Key |             |              | IDENTITY(1, 1) |        |
| 2   | brand_name  | NVARCHAR | 100      |            |             |             |              | UNIQUE         |        |
| 3   | description | NVARCHAR | 500      | YES        |             |             |              |                |        |
| 4   | slug        |          | 100      |            |             |             |              | UNIQUE         |        |

Trong đó `slug` được tạo ra tự động từ  `brand_name` nếu nó không được điền.

Sử dụng thư viện `slugify` để convert `category_name` thành `slug`

**Sample Data Brands**


| brand_id | brand_name | description |
|----------|------------|-------------|
| 1        | Trek       | High-quality bikes for all terrains |
| 2        | Giant      | Specializing in road and mountain bikes |
| 3        | Specialized| Innovative designs for cycling enthusiasts |
| 4        | Cannondale | Known for its performance-oriented bicycles |
| 5        | Scott      | Offers a wide range of bicycles for various purposes |


## 💥 Table customers

| No. | FieldName   | DataType | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint     | Notes  |
|-----|-------------|----------|----------|------------|-------------|-------------|--------------|----------------|--------|
| 1   | customer_id | INT      |          |            | Primary Key |             |              | IDENTITY(1, 1) |        |
| 2   | first_name  | NVARCHAR | 50       |            |             |             |              |                |        |
| 3   | last_name   | NVARCHAR | 50       |            |             |             |              |                |        |
| 4   | phone       | VARCHAR  | 50       |            |             |             |              | UNIQUE         |        |
| 6   | email       | VARCHAR  | 150      |            |             |             |              | UNIQUE         |        |
| 7   | street      | NVARCHAR | 255      |            |             |             |              |                |        |
| 8   | city        | NVARCHAR | 50       |            |             |             |              |                |        |
| 9   | state       | NVARCHAR | 50       |            |             |             |              |                |        |
| 10  | zip_code    | VARCHAR  | 5        | YES        |             |             |              |                |        |
| 11  | password    | VARCHAR  | 255      | YES        |             |             | NULL         |                |        |


Bạn sử dụng thư viện sau để tăng bảo mật cho trường `password`

```bash
yarn add bcrypt
```
Xem cách sử dụng: <https://www.npmjs.com/package/bcrypt#user-content-usage>

Cách so khớp password: <https://www.npmjs.com/package/bcrypt#user-content-to-check-a-password>




**Sample Data Customers**

| customer_id | first_name | last_name | phone       | email                    | birthday   | street       | city      | state | zip_code |
|-------------|------------|-----------|-------------|--------------------------|------------|--------------|-----------|-------|----------|
| 1           | John       | Doe       | 123-456-7890| john.doe@example.com     | 1990-05-15 | 123 Main St  | Anytown   | CA    | 12345    |
| 2           | Jane       | Smith     | 456-789-0123| jane.smith@example.com   | 1985-08-20 | 456 Elm St   | Othertown | NY    | 67890    |
| 3           | Michael    | Johnson   | 789-012-3456| michael.johnson@example.com | 1978-12-25 | 789 Oak St   | Anycity   | TX    | 23456    |
| 4           | Emily      | Brown     | 012-345-6789| emily.brown@example.com   | 1995-03-10 | 901 Pine St  | Sometown  | FL    | 78901    |
| 5           | William    | Martinez  | 234-567-8901| william.martinez@example.com | 1980-11-05 | 345 Cedar St | Othertown | CA    | 56789    |
| 6           | Olivia     | Garcia    | 567-890-1234| olivia.garcia@example.com | 1992-07-30 | 678 Maple St | Anycity   | NY    | 01234    |
| 7           | James      | Lopez     | 890-123-4567| james.lopez@example.com   | 1987-09-18 | 890 Birch St | Sometown  | TX    | 34567    |
| 8           | Sophia     | Lee       | 123-456-7890| sophia.lee@example.com    | 1983-04-22 | 234 Oak St   | Othertown | FL    | 89012    |
| 9           | Benjamin   | Wang      | 456-789-0123| benjamin.wang@example.com | 1975-01-12 | 567 Pine St  | Anycity   | CA    | 23456    |
| 10          | Mia        | Kim       | 789-012-3456| mia.kim@example.com       | 1998-06-28 | 890 Elm St   | Sometown  | NY    | 56789    |
| 11          | Ethan      | Nguyen    | 012-345-6789| ethan.nguyen@example.com  | 1989-02-14 | 901 Maple St | Othertown | TX    | 78901    |
| 12          | Isabella   | Patel     | 234-567-8901| isabella.patel@example.com | 1993-10-08 | 123 Cedar St | Anycity   | FL    | 01234    |
| 13          | Aiden      | Gonzalez  | 567-890-1234| aiden.gonzalez@example.com | 1982-12-03 | 456 Oak St   | Sometown  | CA    | 34567    |
| 14          | Amelia     | Chen      | 890-123-4567| amelia.chen@example.com   | 1996-04-16 | 789 Pine St  | Othertown | NY    | 89012    |
| 15          | Oliver     | Santos    | 123-456-7890| oliver.santos@example.com | 1979-08-25 | 234 Elm St   | Anycity   | TX    | 23456    |
| 16          | Charlotte  | Reyes     | 456-789-0123| charlotte.reyes@example.com | 1991-05-19 | 567 Maple St | Sometown  | FL    | 56789    |
| 17          | Elijah     | Wong      | 789-012-3456| elijah.wong@example.com   | 1986-02-09 | 890 Cedar St | Othertown | CA    | 01234    |



## 💥 Table  staffs

| No. | FieldName  | DataType | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint                  | Notes                       |
|-----|------------|----------|----------|------------|-------------|-------------|--------------|-----------------------------|-----------------------------|
| 1   | staff_id   | INT      |          |            | Primary Key |             |              | IDENTITY(1, 1)              |                             |
| 2   | first_name | NVARCHAR | 50       |            |             |             |              |                             |                             |
| 3   | last_name  | NVARCHAR | 50       |            |             |             |              |                             |                             |
| 4   | phone      | VARCHAR  | 50       |            |             |             |              | UNIQUE                      |                             |
| 5   | email      | VARCHAR  | 150      |            |             |             |              | UNIQUE                      |                             |
| 6   | active     | TINYINT  |          |            |             |             | 0            |                             | 0 = no active, 1 = actived  |
| 7   | store_id   | INIT     |          |            |             | Foreign Key |              | Reference stores (store_id) |                             |
| 8   | manage_id  | INIT     |          |            |             | Foreign Key |              | Reference staffs (staff_id) |                             |
| 9   | password   | VARCHAR  | 255      |            |             |             |              |                             |                             |


Bạn sử dụng thư viện sau để tăng bảo mật cho trường `password`

```bash
yarn add bcrypt
```
Xem cách sử dụng: <https://www.npmjs.com/package/bcrypt#user-content-usage>

Cách so khớp password: <https://www.npmjs.com/package/bcrypt#user-content-to-check-a-password>



**Sample Data Staffs**

| staff_id | first_name | last_name | phone       | email                    | active | store_id | manage_id |
|----------|------------|-----------|-------------|--------------------------|--------|----------|-----------|
| 1        | John       | Doe       | 123-456-7890| john.doe@example.com     | 1      | 1        | NULL      |
| 2        | Jane       | Smith     | 456-789-0123| jane.smith@example.com   | 1      | 2        | 1         |
| 3        | Michael    | Johnson   | 789-012-3456| michael.johnson@example.com | 0      | 1        | NULL      |
| 4        | Emily      | Brown     | 012-345-6789| emily.brown@example.com   | 1      | 3        | 2         |
| 5        | William    | Martinez  | 234-567-8901| william.martinez@example.com | 1      | 2        | 1         |


## 💥 Table  products


| No. | FieldName    | DataType       | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint                         | Notes  |
|-----|--------------|----------------|----------|------------|-------------|-------------|--------------|------------------------------------|--------|
| 1   | product_id   | INT            |          |            | Primary Key |             |              | IDENTITY(1, 1)                     |        |
| 2   | product_name | NVARCHAR       | 255      |            |             |             |              | UNIQUE                             |        |
| 3   | price        | DECIMAL(18, 2) |          |            |             |             | 0            | Check: price >= 0                  |        |
| 4   | discount     | DECIMAL(18, 2) |          |            |             |             | 0            | Check: discount BETWEEN 0 AND 70   |        |
| 5   | category_id  | INT            |          |            |             | Foreign Key |              | Reference categories (category_id) |        |
| 6   | brand_id     | INT            |          |            |             | Foreign Key |              | Reference brands (brand_id)        |        |
| 7   | description  | NVARCHAR       | MAX      | Yes        |             |             | Null         |                                    |        |
| 8   | model_year   | SMALL INIT     |          |            |             |             |              |                                    |        |
| 9   | slug         | VARCHAR        | 255      |            |             |             | Null         | UNIQUE                             |        |
| 10  | thumbnail    | VARCHAR        | 255      | Yes        |             |             |              |                                    |        |
| 11  | stock        | SMALL INIT     | 5        |            |             |             | 0            | Check: stock>= 0                   |        |


**Sample Data Products**

| product_id | product_name | price | discount | category_id | brand_id | description | model_year |
|------------|--------------|-------|----------|-------------|----------|-------------|------------|
| 1          | Road Bike    | 500   | 0        | 1           | 1        | Road bike for paved roads | 2022       |
| 2          | Mountain Bike| 600   | 0        | 2           | 2        | Off-road and trail bike  | 2022       |
| 3          | Hybrid Bike  | 450   | 0        | 3           | 3        | Versatile bike for various terrains | 2022 |
| 4          | Cruiser Bike | 400   | 0        | 4           | 4        | Comfortable and stylish bike for leisurely rides | 2022 |
| 5          | Electric Bike| 800   | 0        | 5           | 5        | Electric bike powered by electric motor | 2022 |
| 6          | Road Bike Pro| 1200  | 100      | 1           | 1        | Professional road bike for paved roads | 2022 |
| 7          | Mountain Bike Pro| 1500 | 120    | 2           | 2        | Professional off-road and trail bike | 2022 |
| 8          | Hybrid Bike Pro| 1000  | 80      | 3           | 3        | Professional versatile bike for various terrains | 2022 |
| 9          | Cruiser Bike Pro| 900   | 70      | 4           | 4        | Professional comfortable and stylish bike | 2022 |
| 10         | Electric Bike Pro| 1800 | 150    | 5           | 5        | Professional electric bike powered by electric motor | 2022 |
| 11         | Road Bike XL | 700   | 0        | 1           | 1        | Extra large road bike for paved roads | 2022 |
| 12         | Mountain Bike XL| 800 | 0        | 2           | 2        | Extra large off-road and trail bike | 2022 |
| 13         | Hybrid Bike XL| 600   | 0        | 3           | 3        | Extra large versatile bike for various terrains | 2022 |
| 14         | Cruiser Bike XL| 550   | 0        | 4           | 4        | Extra large comfortable and stylish bike | 2022 |
| 15         | Electric Bike XL| 1000 | 0       | 5           | 5        | Extra large electric bike powered by electric motor | 2022 |


## 💥 Table  orders

| No. | FieldName        | DataType       | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint                        | Notes                                                                  |
| --- | ---------------- | -------------- | -------- | ---------- | ----------- | ----------- | ------------ | --------------------------------- | ---------------------------------------------------------------------- |
| 1   | order_id         | INT            |          |            | Primary Key |             |              | IDENTITY(1, 1)                    |                                                                        |
| 2   | customer_id      | INIT           |          |            |             | Foreign Key |              | Reference customers (customer_id) |                                                                        |
| 3   | order_status     | TINYINT        |          |            |             |             |              | 1/2/3/4                           | Order status: 1 = Pending; 2 = Processing; 3 = Rejected; 4 = Completed |
| 4   | order_date       | VARCHAR        | 50       |            |             |             | NOW          |                                   |                                                                        |
| 5   | require_date     | DATETIME       |          | YES        |             |             |              |                                   |                                                                        |
| 6   | shipping_date    | DATETIME       |          |            |             |             |              |                                   |                                                                        |
| 8   | staff_id         | INIT           | 20       |            |             | Foreign Key |              | Reference staffs (staff_id)       |                                                                        |
| 9   | order_note       | NVARCHAR       |          | YES        |             |             |              |                                   |                                                                        |
| 10  | shipping_address | NVARCHAR       |          | YES        |             |             |              |                                   |                                                                        |
| 11  | shipping_city    | NVARCHAR       |          | YES        |             |             |              |                                   |                                                                        |
| 12  | payment_type     | TINYINT        |          |            |             |             | 4            | 1/2/3/4                           | payment type: 1 = COD; 2 = Credit; 3 = ATM; 4 = Cash                   |
| 13  | order_amount     | DECIMAL(18, 2) |          |            |             |             | 0            |                                   |                                                                        |



## 💥 Table order_items


Trong MongoDB `order_items` là sub Schema của `Order` ở dạng `embedding`


| No. | FieldName  | DataType       | DataSize | Allow null | Key         | Foreign Key | DefaultValue | Constraint                       |
| --- | ---------- | -------------- | -------- | ---------- | ----------- | ----------- | ------------ | -------------------------------- |
| 1   | order_id   | INT            |          |            | Primary Key | Foreign Key |              | Reference orders (order_id)      |
| 2   | item_id    | INT            |          |            | Primary Key |             |              |                                  |
| 3   | product_id | INT            |          |            |             | Foreign Key |              | Reference products (product_id)  |
| 3   | quantity   | INIT           |          |            |             |             | 0            | Check: quantity >= 0             |
| 4   | price      | DECIMAL(18, 2) |          |            |             |             | 0            | Check: price >= 0                |
| 5   | discount   | DECIMAL(18, 2) |          |            |             |             | 0            | Check: discount BETWEEN 0 AND 70 |




---

2. Tạo mỗi bảng từ 5-10 records: Sử dụng câu lệnh INSERT, thứ tự nhập dữ liệu cho các tables:

- categories
- brands
- customers
- staffs
- products
- orders
- order_items


---