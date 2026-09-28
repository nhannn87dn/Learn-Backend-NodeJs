# Tổng quan về Database — Từ SQL đến NoSQL

**Mục lục**

1. [Database là gì, và tại sao ứng dụng cần nó?](#1-database-là-gì-và-tại-sao-ứng-dụng-cần-nó)
2. [Hai trường phái lớn: SQL và NoSQL](#2-hai-trường-phái-lớn-relational-sql-và-non-relational-nosql)
3. [Phần I: SQL — Cơ sở dữ liệu quan hệ](#3-phần-i-sql--cơ-sở-dữ-liệu-quan-hệ)
4. [Phần II: NoSQL — Document Database (MongoDB)](#4-phần-ii-nosql--document-database-mongodb)
5. [So sánh SQL và MongoDB](#5-so-sánh-sql-và-mongodb)
6. [Bảng thuật ngữ nhanh](#6-bảng-thuật-ngữ-nhanh)
7. [Câu hỏi tự kiểm tra](#7-câu-hỏi-tự-kiểm-tra)
8. [Chuẩn bị cho bài học MongoDB tiếp theo](#8-chuẩn-bị-cho-bài-học-mongodb-tiếp-theo)

---

## 1. Database là gì, và tại sao ứng dụng cần nó?

Đến giờ các bạn đã biết Express giúp mình xây dựng API — nhận request, xử lý logic, trả response. Nhưng có một vấn đề: **mọi thứ trong RAM của Node.js sẽ mất khi server restart**. Nếu lưu user, sản phẩm, đơn hàng trong một biến JavaScript, chỉ cần `nodemon` restart một cái là bay hết dữ liệu.

### 1.1. Sao không ghi ra file JSON cho nhanh?

Có thể dùng module `fs` ghi dữ liệu ra `data.json`. Cách này chạy được với bài tập nhỏ, nhưng sẽ vỡ ngay khi ứng dụng lớn lên:

- Muốn tìm 1 user phải **đọc cả file** vào RAM — file 1 GB thì server "đứng hình".
- 2 request **cùng ghi một lúc** → request sau ghi đè request trước, mất dữ liệu.
- Server crash **giữa lúc đang ghi** → file hỏng, không đọc lại được.
- Không có phân quyền, không có kiểm tra dữ liệu hợp lệ, không có sao lưu tự động.

### 1.2. Database giải quyết những gì?

**Database (cơ sở dữ liệu)** là phần mềm chuyên dụng để:
- **Lưu trữ dữ liệu lâu dài** (persistent storage) — ghi xuống đĩa, sống sót qua restart.
- **Truy vấn hiệu quả** — tìm 1 user trong 10 triệu bản ghi chỉ trong vài mili-giây nhờ **index** (xem mục 3.8).
- **Đảm bảo tính toàn vẹn** — không cho phép dữ liệu mâu thuẫn, trùng lặp sai lệch.
- **Xử lý truy cập đồng thời** — hàng nghìn request cùng đọc/ghi mà không làm hỏng dữ liệu của nhau.
- **Bảo mật và phân quyền** — ai được đọc, ai được ghi.

Nói ngắn gọn: Express là "bộ não xử lý", Database là "bộ nhớ dài hạn".

### 1.3. Database, DBMS và cách ứng dụng kết nối tới database

Hai từ này hay bị dùng lẫn lộn:

- **Database**: *tập hợp dữ liệu* được tổ chức có cấu trúc (ví dụ: dữ liệu của cửa hàng online).
- **DBMS (Database Management System)**: *phần mềm* quản lý database — MySQL, PostgreSQL, MongoDB... Khi nói "cài database", thực chất là cài DBMS.

DBMS chạy như một **server riêng**, lắng nghe ở một cổng (port). Ứng dụng Express của bạn là **client**, kết nối tới nó qua một **connection string**:

```
+----------------------+                         +------------------------+
|  Express app         |   1. gửi truy vấn       |  DBMS (Database Server)|
|  (Node.js)           | ----------------------> |                        |
|                      |                         |  PostgreSQL  :5432     |
|  Driver / ORM / ODM  | <---------------------- |  MySQL       :3306     |
|                      |   2. trả kết quả        |  MongoDB     :27017    |
+----------------------+                         +-----------+------------+
                                                             |
                                                             v
                                                  +---------------------+
                                                  | Ổ đĩa (file dữ liệu)|
                                                  +---------------------+
```

Ví dụ connection string:

```
postgresql://admin:secret@localhost:5432/shop_db
mongodb://localhost:27017/shop_db
```

Để Node.js "nói chuyện" được với DBMS, ta dùng một trong các loại thư viện sau (không loại nào bắt buộc, chỉ khác nhau ở mức độ tiện lợi):

| Loại | Là gì | Ví dụ |
|---|---|---|
| **Driver** | Thư viện cấp thấp, gửi câu lệnh trực tiếp tới DB | `pg`, `mysql2`, `mongodb` |
| **ORM** (Object-Relational Mapping) | Làm việc với SQL DB bằng object/class JS thay vì viết SQL thuần | Prisma, Sequelize, TypeORM |
| **ODM** (Object-Document Mapping) | Tương tự ORM nhưng dành cho document DB | **Mongoose** (cho MongoDB) |

---

## 2. Hai trường phái lớn: Relational (SQL) và Non-relational (NoSQL)

Đây là điểm phân nhánh quan trọng nhất mà học viên mới cần nắm trước khi đi sâu vào bất kỳ loại DB cụ thể nào.

| | **SQL (Relational)** | **NoSQL — Document DB** |
|---|---|---|
| Đơn vị lưu trữ | Bảng (Table) — hàng và cột | Document (tài liệu giống JSON), gom trong collection |
| Cấu trúc | Schema cố định, định nghĩa trước | Linh hoạt (flexible schema) |
| Quan hệ dữ liệu | Dùng khóa ngoại (Foreign Key) để liên kết bảng, ráp lại bằng JOIN | Thường nhúng (embed) dữ liệu liên quan vào nhau, hoặc tham chiếu |
| Ngôn ngữ truy vấn | SQL — chuẩn chung cho mọi RDBMS | MongoDB Query — câu truy vấn viết bằng object JS |
| Mở rộng (scale) | Mạnh nhất khi chạy trên 1 máy; scale ra nhiều máy được nhưng phức tạp hơn | Thiết kế từ đầu để chạy trên nhiều máy |
| Ví dụ | MySQL, PostgreSQL, SQL Server, Oracle, SQLite | MongoDB, Firestore, CouchDB |
| Phù hợp | Dữ liệu có cấu trúc rõ ràng, nhiều quan hệ chặt chẽ, cần giao dịch an toàn (ngân hàng, kế toán) | Dữ liệu đa dạng, cấu trúc hay thay đổi, lượng truy cập/dữ liệu rất lớn |

Không cái nào "tốt hơn" cái nào tuyệt đối — chúng giải quyết bài toán khác nhau. Trong MERN stack, ta học MongoDB (NoSQL) vì nó "nói chuyện" bằng JSON — rất khớp với JavaScript. Nhưng hiểu SQL trước sẽ giúp các bạn hiểu MongoDB đang **khác gì** và **đánh đổi gì**.

---

## 3. Phần I: SQL — Cơ sở dữ liệu quan hệ

SQL database (còn gọi là **RDBMS** — Relational DBMS) tổ chức dữ liệu thành các **bảng có liên kết với nhau**. Hãy tưởng tượng nó như một file Excel có nhiều sheet, và các sheet "trỏ" sang nhau.

### 3.1. Entity và Attribute — tư duy trước khi tạo bảng

Trước khi tạo bảng, ta phải trả lời: *ứng dụng cần lưu thông tin về **những đối tượng nào**, và **mỗi đối tượng có những đặc điểm gì**?*

- **Entity (Thực thể)**: một "đối tượng" trong thế giới thực mà ta cần lưu thông tin. Ví dụ trong cửa hàng online: *Khách hàng*, *Sản phẩm*, *Đơn hàng*, *Danh mục*.
  - Mỗi đối tượng cụ thể (khách hàng tên An, khách hàng tên Bình...) gọi là một **entity instance** (thể hiện của thực thể).
- **Attribute (Thuộc tính)**: đặc điểm mô tả entity. Ví dụ *Khách hàng* có: tên, email, tuổi.

Ta thường vẽ entity bằng một khối như sau (đây là dạng đơn giản của **sơ đồ ERD** — Entity Relationship Diagram):

```
+----------------------+
|        USER          |   <-- Entity (thực thể)
+----------------------+
| id        (PK)       |   <-- Attribute dùng để định danh (khóa chính)
| name                 |   <-- Attribute
| email                |   <-- Attribute
| age                  |   <-- Attribute
+----------------------+
```

Khi đưa vào SQL database, mọi thứ được "dịch" như sau:

```
 THẾ GIỚI THỰC               MÔ HÌNH (ERD)            SQL DATABASE
 -------------------         -----------------        ------------------
 "Khách hàng"         -->    Entity: User       -->   Table: users
 An, Bình, Chi        -->    Entity instance    -->   Row (hàng / bản ghi)
 tên, email, tuổi     -->    Attribute          -->   Column (cột)
```

### 3.2. Database, Table, Row, Column

**Database** là "thùng chứa" lớn nhất, gom các bảng của **một ứng dụng**. Một DBMS có thể chứa nhiều database:

```
DBMS: PostgreSQL Server (localhost:5432)
 |
 +-- Database: shop_db          <-- dữ liệu của app bán hàng
 |     +-- Table: users
 |     +-- Table: products
 |     +-- Table: categories
 |     +-- Table: orders
 |
 +-- Database: blog_db          <-- dữ liệu của app blog
       +-- Table: posts
       +-- Table: comments
```

**Table (Bảng)** lưu dữ liệu của **một entity**. Giải phẫu một bảng:

```
                   Column (cột) = Attribute (thuộc tính)
            |      |              |             |
            v      v              v             v
          +----+--------+--------------------+-----+
          | id | name   | email              | age |  <-- tên các cột (thuộc schema)
          +----+--------+--------------------+-----+
Row 1 --> | 1  | An     | an@example.com     | 22  |
Row 2 --> | 2  | Bình   | binh@example.com   | 25  |  <-- 1 row = 1 bản ghi = 1 user
Row 3 --> | 3  | Chi    | chi@example.com    | 19  |
          +----+--------+--------------------+-----+
            ^                                  ^
            |                                  |
       Primary Key                   Cell (ô): giao của 1 row và 1 column,
                                     ví dụ row 3 + cột age = 19
```

- **Table (Bảng)**: tập hợp các bản ghi cùng loại — bảng `users`, bảng `orders`.
- **Row / Record (Hàng / Bản ghi)**: **một** entity instance cụ thể — ví dụ user An.
- **Column / Field (Cột / Trường)**: **một** attribute — ví dụ `email`. Mọi row trong bảng đều có đủ các cột này (giá trị có thể để trống — `NULL` — nếu cho phép).
- **Schema**: "bản thiết kế" của bảng — gồm tên bảng, tên cột, kiểu dữ liệu, ràng buộc. Trong SQL, schema phải **định nghĩa trước** khi thêm dữ liệu.

### 3.3. Kiểu dữ liệu và ràng buộc (Constraint)

Mỗi cột phải khai báo **kiểu dữ liệu** — DB sẽ từ chối dữ liệu sai kiểu (ví dụ ghi chữ `"abc"` vào cột số).

| Kiểu | Ý nghĩa | Ví dụ giá trị |
|---|---|---|
| `INT` | Số nguyên | `22`, `200000` |
| `DECIMAL(10,2)` | Số thập phân chính xác (dùng cho tiền có phần lẻ) | `99.95` |
| `VARCHAR(n)` | Chuỗi tối đa n ký tự | `'An'` |
| `TEXT` | Chuỗi dài không giới hạn cụ thể | Nội dung bài viết |
| `BOOLEAN` | Đúng / sai | `TRUE` |
| `DATE`, `TIMESTAMP` | Ngày; ngày + giờ | Ngày sinh, thời điểm tạo đơn |

**Ràng buộc (constraint)** là các "luật" DB tự động kiểm tra mỗi khi ghi dữ liệu:

| Ràng buộc | Ý nghĩa |
|---|---|
| `PRIMARY KEY` | Khóa chính — định danh duy nhất mỗi row (mục 3.4) |
| `FOREIGN KEY` / `REFERENCES` | Khóa ngoại — liên kết sang bảng khác (mục 3.5) |
| `NOT NULL` | Bắt buộc phải có giá trị |
| `UNIQUE` | Không được trùng giữa các row (ví dụ email) |
| `DEFAULT` | Giá trị mặc định nếu không truyền vào |
| `CHECK` | Điều kiện tùy ý, ví dụ `age >= 0` |

Ví dụ định nghĩa schema bằng SQL (cú pháp PostgreSQL):

```sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,               -- khóa chính, tự tăng 1, 2, 3...
  name       VARCHAR(100) NOT NULL,            -- bắt buộc, tối đa 100 ký tự
  email      VARCHAR(255) NOT NULL UNIQUE,     -- bắt buộc, không được trùng
  age        INT CHECK (age >= 0),             -- số nguyên, không âm
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- tự điền thời điểm tạo
);

CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),   -- khóa ngoại trỏ tới users.id
  total   INT NOT NULL CHECK (total >= 0)      -- đơn vị: VND
);
```

Đây chính là ý nghĩa của **"schema cố định"**: bảng `users` chỉ có đúng 5 cột này. Muốn thêm cột `phone`, phải chạy lệnh `ALTER TABLE` để sửa schema trước.

### 3.4. Khóa chính (Primary Key — PK)

**Primary Key** là cột (hoặc nhóm cột) dùng để **định danh duy nhất** mỗi row — giống số CCCD của mỗi người.

Quy tắc của khóa chính:
1. **Duy nhất** — không có 2 row trùng khóa chính.
2. **Không được NULL** — row nào cũng phải có.
3. **Nên ổn định** — không thay đổi theo thời gian.
4. Mỗi bảng có **đúng 1** khóa chính.

Các kiểu khóa chính thường gặp:
- **Surrogate key (khóa thay thế)**: một cột `id` vô nghĩa về mặt nghiệp vụ, do DB tự sinh (1, 2, 3... hoặc UUID). Đây là cách **phổ biến nhất**.
- **Natural key (khóa tự nhiên)**: dùng dữ liệu có sẵn, ví dụ `email` hay mã số thuế. Nhược điểm: dữ liệu thật có thể thay đổi (user đổi email) → khóa chính bị thay đổi theo, rất phiền.
- **Composite key (khóa phức hợp)**: kết hợp **nhiều cột** thành khóa chính, ví dụ `(order_id, product_id)` trong bảng `order_items` ở mục 3.6.

### 3.5. Khóa ngoại (Foreign Key — FK)

**Foreign Key** là một cột trong bảng A **lưu giá trị khóa chính của bảng B**, để chỉ ra "row này liên quan tới row nào bên bảng kia".

- Bảng chứa khóa ngoại gọi là **bảng con** (child) — ở đây là `orders`.
- Bảng được trỏ tới gọi là **bảng cha** (parent) — ở đây là `users`.

```
  orders (bảng con)                           users (bảng cha)
 +----+---------+--------+                   +----+------+
 | id | user_id | total  |                   | id | name |
 +----+---------+--------+                   +----+------+
 | 1  |    1    | 200000 |-------+---------->| 1  | An   |
 | 2  |    1    | 150000 |-------+     +---->| 2  | Bình |
 | 3  |    2    | 300000 |-------------+     | 3  | Chi  |
 +----+---------+--------+                   +----+------+
   PK     FK                                   PK
```

Cột `orders.user_id` là **foreign key**, trỏ tới `users.id`. Đọc sơ đồ: đơn 1 và đơn 2 của An, đơn 3 của Bình, Chi chưa có đơn nào. Đó chính là bản chất của "relational" — dữ liệu được **tách ra** thành nhiều bảng, rồi **liên kết lại** qua khóa.

**Toàn vẹn tham chiếu (referential integrity)** — lợi ích lớn nhất của FK là DB **tự chặn** dữ liệu "mồ côi":

```sql
INSERT INTO orders (user_id, total) VALUES (99, 100000);
-- LỖI: vi phạm khóa ngoại — không tồn tại user nào có id = 99
```

Khi xóa row ở bảng cha, ta khai báo DB nên xử lý các row con thế nào (`ON DELETE`):

| Tùy chọn | Khi xóa user An thì các đơn hàng của An... |
|---|---|
| `RESTRICT` / `NO ACTION` (mặc định) | Không cho xóa An khi An vẫn còn đơn hàng |
| `CASCADE` | Xóa luôn tất cả đơn hàng của An |
| `SET NULL` | Giữ đơn hàng, nhưng `user_id` chuyển thành `NULL` |

### 3.6. Các loại quan hệ (Relationship)

Đây là phần rất quan trọng vì nó quyết định cách thiết kế DB sau này (cả SQL lẫn MongoDB).

**Cách xác định loại quan hệ giữa 2 entity A và B** — tự hỏi 2 câu:

| 1 A có thể có mấy B? | 1 B có thể thuộc về mấy A? | Quan hệ A – B |
|---|---|---|
| 1 | 1 | **1:1** |
| Nhiều | 1 | **1:N** |
| 1 | Nhiều | **N:1** |
| Nhiều | Nhiều | **N:N** |

**Ký hiệu dùng trong các sơ đồ dưới đây** (dạng ASCII của ký hiệu "chân chim" — crow's foot):
- Đầu nối `|` hoặc `-` sát bảng = phía **một**.
- Đầu nối `<` hoặc `>` sát bảng (hình "chân chim" mở về phía bảng) = phía **nhiều**.

#### 3.6.1. Quan hệ 1:1 (One-to-One)

> 1 user có **đúng 1** hồ sơ chi tiết (profile), và 1 profile chỉ thuộc về **đúng 1** user.

```
+-------+ 1        1 +---------------+
| users |------------| user_profiles |
+-------+            +---------------+
```

Dữ liệu minh họa:

```
  user_profiles (bảng con)                        users (bảng cha)
 +----+---------+----------+                     +----+------+
 | id | user_id | address  |                     | id | name |
 +----+---------+----------+                     +----+------+
 | 10 |    1    | Hà Nội   |-------------------->| 1  | An   |
 | 11 |    2    | Đà Nẵng  |-------------------->| 2  | Bình |
 | 12 |    3    | Cần Thơ  |-------------------->| 3  | Chi  |
 +----+---------+----------+                     +----+------+
      FK + UNIQUE
```

- Khóa ngoại `user_id` đặt ở bảng phụ (`user_profiles`) và **phải có thêm `UNIQUE`** — nếu không, 1 user có thể có 2 profile, và quan hệ sẽ thành 1:N.
- Vì sao không gộp chung 1 bảng? Thường để tách phần dữ liệu ít dùng/lớn/nhạy cảm (tiểu sử, thông tin thanh toán...) ra khỏi bảng chính.

#### 3.6.2. Quan hệ 1:N (One-to-Many)

> 1 user có thể có **nhiều** đơn hàng, nhưng 1 đơn hàng chỉ thuộc về **1** user.

```
+-------+ 1        N +--------+
| users |-----------<| orders |
+-------+            +--------+
```

Dữ liệu minh họa (chính là 2 bảng ở mục 3.5):

```
                    +--> Order #1 (user_id = 1, total = 200000)
                    |
  User #1 (An) -----+--> Order #2 (user_id = 1, total = 150000)

  User #2 (Bình) ------> Order #3 (user_id = 2, total = 300000)

  User #3 (Chi)          (chưa có đơn nào — vẫn hợp lệ, "N" có thể là 0)
```

- Khóa ngoại đặt ở **phía N** (`orders.user_id`).
- Vì sao không đặt ở phía 1, tức là bảng `users` có cột `order_ids`? Vì 1 ô chỉ nên chứa **1 giá trị**; An có 2, 10 hay 1.000 đơn thì không có cách nào nhét gọn vào 1 cột.
- Đây là loại quan hệ **phổ biến nhất**: user – bài viết, bài viết – bình luận, danh mục – sản phẩm...

#### 3.6.3. Quan hệ N:1 (Many-to-One)

> **Nhiều** sản phẩm thuộc về **1** danh mục; 1 sản phẩm chỉ nằm trong 1 danh mục.

N:1 thực chất **chính là 1:N nhìn từ phía ngược lại**: "users 1:N orders" cũng có nghĩa là "orders N:1 users". Ta gọi là N:1 khi đang đứng ở phía "nhiều" để nhìn sang — ví dụ lúc thiết kế bảng `products` và tự hỏi "mỗi sản phẩm thuộc danh mục nào?".

```
+----------+ N        1 +------------+
| products |>-----------| categories |
+----------+            +------------+
```

Dữ liệu minh họa:

```
  Product "iPhone 16"   ----+
                            |
  Product "Galaxy S25"  ----+----> Category #1 "Điện thoại"
                            |
  Product "Pixel 9"     ----+

  Product "MacBook Air" ---------> Category #2 "Laptop"
```

```
 categories                 products
+----+------------+        +----+-------------+-------------+
| id | name       |        | id | name        | category_id |
+----+------------+        +----+-------------+-------------+
| 1  | Điện thoại |        | 1  | iPhone 16   | 1           |
| 2  | Laptop     |        | 2  | Galaxy S25  | 1           |
+----+------------+        | 3  | Pixel 9     | 1           |
                           | 4  | MacBook Air | 2           |
                           +----+-------------+-------------+
                                                   FK
```

- Khóa ngoại vẫn đặt ở **phía N** (`products.category_id`) — giống hệt 1:N.

#### 3.6.4. Quan hệ N:N (Many-to-Many)

> 1 đơn hàng chứa **nhiều** sản phẩm, và 1 sản phẩm có thể nằm trong **nhiều** đơn hàng.

```
  Order #1 ---+---> Áo thun
              +---> Quần jeans

  Order #2 ---+---> Áo thun          <-- "Áo thun" nằm trong cả đơn #1 và #2
              +---> Mũ lưỡi trai

  => Nhìn từ đơn hàng: 1 đơn có nhiều sản phẩm.
  => Nhìn từ sản phẩm: 1 sản phẩm nằm trong nhiều đơn.
```

Vấn đề: đặt khóa ngoại ở bảng nào cũng không được — `orders` không thể có 1 cột chứa nhiều `product_id`, và `products` cũng không thể có 1 cột chứa nhiều `order_id`. Giải pháp: tạo **bảng trung gian** (junction table), tách N:N thành **2 quan hệ 1:N**:

```
+--------+ N        N +----------+
| orders |>----------<| products |
+--------+            +----------+

        Không nối trực tiếp được  -->  tách thành 2 quan hệ 1:N

+--------+ 1     N +-------------+ N     1 +----------+
| orders |--------<| order_items |>--------| products |
+--------+         +-------------+         +----------+
```

Bảng `order_items` — **mỗi row là một "sợi dây nối"** giữa 1 đơn hàng và 1 sản phẩm (products: 1 = Áo thun, 2 = Quần jeans, 3 = Mũ lưỡi trai):

```
 order_items
+----------+------------+----------+
| order_id | product_id | quantity |
+----------+------------+----------+
| 1        | 1          | 2        |   <-- đơn #1 mua 2 Áo thun
| 1        | 2          | 1        |   <-- đơn #1 mua 1 Quần jeans
| 2        | 1          | 1        |   <-- đơn #2 mua 1 Áo thun
| 2        | 3          | 4        |   <-- đơn #2 mua 4 Mũ lưỡi trai
+----------+------------+----------+
    FK          FK
    \___________/
    Composite PK
```

- Bảng trung gian chứa **2 khóa ngoại**; thường dùng cặp `(order_id, product_id)` làm **composite primary key**.
- Bảng trung gian có thể chứa thêm thông tin **của chính mối quan hệ**: số lượng, giá tại thời điểm mua...
- Ví dụ N:N khác: sinh viên – môn học, bài viết – tag, user – role.

#### 3.6.5. Tóm tắt: khóa ngoại đặt ở đâu?

| Quan hệ | Ví dụ | Khóa ngoại đặt ở |
|---|---|---|
| 1:1 | users – user_profiles | Bảng phụ (`user_profiles.user_id`) + `UNIQUE` |
| 1:N | users – orders | Phía N (`orders.user_id`) |
| N:1 | products – categories | Phía N (`products.category_id`) |
| N:N | orders – products | Bảng trung gian `order_items` chứa 2 khóa ngoại |

**Quy tắc cần nhớ: khóa ngoại luôn nằm ở phía "nhiều".** Với N:N, cả 2 phía đều là "nhiều" nên cần bảng thứ 3.

### 3.7. Truy vấn dữ liệu — ngôn ngữ SQL

**SQL (Structured Query Language)** là ngôn ngữ để "hỏi" và "ra lệnh" cho database. Bốn thao tác cơ bản nhất gọi là **CRUD**:

| CRUD | Câu lệnh SQL | Ví dụ |
|---|---|---|
| **C**reate — thêm | `INSERT` | `INSERT INTO users (name, email, age) VALUES ('Dũng', 'dung@example.com', 30);` |
| **R**ead — đọc | `SELECT` | `SELECT name, email FROM users WHERE age > 20;` |
| **U**pdate — sửa | `UPDATE` | `UPDATE users SET age = 23 WHERE id = 1;` |
| **D**elete — xóa | `DELETE` | `DELETE FROM users WHERE id = 3;` |

> Cẩn thận: `UPDATE` hoặc `DELETE` mà **quên `WHERE`** sẽ tác động lên **toàn bộ bảng**.

**JOIN** — ráp dữ liệu từ nhiều bảng lại theo khóa ngoại:

```sql
-- INNER JOIN: chỉ lấy những user CÓ đơn hàng
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
-- Kết quả: (An, 200000), (An, 150000), (Bình, 300000)

-- LEFT JOIN: lấy TẤT CẢ user, kể cả user chưa có đơn
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
-- Kết quả thêm dòng: (Chi, NULL)

-- N:N: sản phẩm nào nằm trong đơn #1? (JOIN qua bảng trung gian)
SELECT products.name, order_items.quantity
FROM order_items
JOIN products ON products.id = order_items.product_id
WHERE order_items.order_id = 1;
```

`JOIN` là thế mạnh cốt lõi của SQL, và khi các cột dùng để nối đã có index thì JOIN chạy rất nhanh. JOIN chỉ trở thành vấn đề khi dữ liệu bị **chia ra nhiều máy chủ** (mục 4.1): lúc đó muốn ráp 2 bảng nằm ở 2 máy khác nhau phải gửi dữ liệu qua mạng, vừa chậm vừa phức tạp. Đây là một lý do chính khiến NoSQL chọn cách thiết kế khác.

### 3.8. Index — "mục lục" của database

Không có index, muốn tìm `email = 'chi@example.com'`, DB phải **đọc lần lượt từng row** (full table scan) — giống lật từng trang sách để tìm một từ. Với 10 triệu row, việc này rất chậm.

**Index** giống **mục lục cuối sách**: một cấu trúc dữ liệu được sắp xếp sẵn (thường là B-Tree), giúp DB nhảy thẳng tới row cần tìm.

```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
-- Giờ câu "SELECT * FROM orders WHERE user_id = 1" chạy nhanh hơn rất nhiều
```

- Cột `PRIMARY KEY` và `UNIQUE` được **tự động** tạo index.
- Đánh đổi: index giúp **đọc nhanh hơn** nhưng làm **ghi chậm hơn một chút** (mỗi lần INSERT/UPDATE phải cập nhật cả index) và **tốn thêm dung lượng**. Chỉ tạo index cho những cột hay dùng để tìm kiếm, lọc, sắp xếp, JOIN.
- Index là khái niệm chung — MongoDB và hầu hết các DB khác cũng có.

### 3.9. Chuẩn hóa dữ liệu (Normalization)

**Normalization** là nguyên tắc tách dữ liệu thành nhiều bảng nhỏ để **tránh trùng lặp** và **tránh mâu thuẫn**.

Bảng **chưa chuẩn hóa** — thông tin user lặp lại trong mỗi đơn hàng:

```
 orders (chưa chuẩn hóa)
+----+-----------+------------------+--------+
| id | user_name | user_email       | total  |
+----+-----------+------------------+--------+
| 1  | An        | an@example.com   | 200000 |
| 2  | An        | an@example.com   | 150000 |   <-- lặp lại thông tin của An
| 3  | Bình      | binh@example.com | 300000 |
+----+-----------+------------------+--------+
```

Vấn đề: An đổi email thì phải sửa **mọi dòng** có An; sót 1 dòng là dữ liệu **mâu thuẫn** (An có 2 email khác nhau).

Sau khi **chuẩn hóa**: tách thông tin user ra bảng `users`, bảng `orders` chỉ giữ `user_id` (đúng như mục 3.5). Email của An giờ chỉ nằm **ở đúng 1 chỗ**.

Một quy tắc chuẩn hóa cơ bản khác: **mỗi ô chỉ chứa 1 giá trị** — không lưu `"Áo thun, Quần jeans"` chung trong 1 ô, mà tách ra bảng `order_items`. (Các bậc chuẩn hóa 1NF, 2NF, 3NF sẽ học khi đi sâu vào SQL.)

### 3.10. Transaction và ACID

**Transaction (giao dịch)** là một nhóm câu lệnh được DB coi như **một khối duy nhất**: hoặc tất cả thành công, hoặc tất cả bị hủy.

Ví dụ kinh điển: chuyển 500.000 VND từ tài khoản 1 sang tài khoản 2 — trừ tiền và cộng tiền phải xảy ra **cùng nhau, toàn vẹn**, không thể chỉ trừ mà không cộng.

```sql
BEGIN;                                                      -- bắt đầu giao dịch
UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;
COMMIT;                                                     -- xác nhận: lưu cả 2 thay đổi

-- Nếu có lỗi xảy ra giữa chừng, ta gọi:
-- ROLLBACK;   -- hủy toàn bộ, dữ liệu trở về như trước khi BEGIN
```

**ACID** — 4 tính chất đảm bảo giao dịch an toàn, là thế mạnh truyền thống của SQL:
- **A**tomicity (Tính nguyên tử): giao dịch hoặc thực hiện toàn bộ, hoặc không gì cả — không có chuyện nửa vời.
- **C**onsistency (Tính nhất quán): dữ liệu luôn ở trạng thái hợp lệ (thỏa mọi ràng buộc) trước và sau giao dịch.
- **I**solation (Tính cô lập): nhiều giao dịch chạy song song không "nhìn thấy" trạng thái dở dang của nhau.
- **D**urability (Tính bền vững): khi đã `COMMIT`, dữ liệu chắc chắn được lưu, kể cả khi mất điện ngay sau đó.

---

## 4. Phần II: NoSQL — Document Database (MongoDB)

### 4.1. Vì sao NoSQL ra đời?

Khoảng những năm 2000, các công ty như Google, Amazon, Facebook gặp những bài toán mà SQL truyền thống xử lý rất vất vả:
- **Dữ liệu khổng lồ** và **lượng truy cập cực lớn** — vượt quá sức của một máy chủ.
- **Dữ liệu đa dạng**, cấu trúc thay đổi liên tục — sửa schema của bảng hàng tỷ row mỗi tuần là cơn ác mộng.

Khi một máy không còn đủ sức, có 2 cách mở rộng (scale):

```
  SCALE DỌC (vertical)                  SCALE NGANG (horizontal)
  = nâng cấp 1 máy cho mạnh hơn         = thêm nhiều máy chạy cùng nhau

      +----------+                      +--------+  +--------+  +--------+
      |          |                      | Máy 1  |  | Máy 2  |  | Máy 3  |
      |   MÁY    |                      | user   |  | user   |  | user   |
      |   CHỦ    |                      | A -> H |  | I -> P |  | Q -> Z |
      |   TO     |                      +--------+  +--------+  +--------+
      +----------+
  RAM: 16 GB -> 512 GB                  Hết chỗ? Thêm máy 4, máy 5...
  CPU: 4 -> 64 nhân

  + Đơn giản, không phải sửa code       + Gần như không giới hạn
  - Có giới hạn phần cứng, rất đắt      - Phức tạp: dữ liệu nằm rải nhiều máy
```

Hai kỹ thuật quan trọng khi chạy DB trên nhiều máy:
- **Sharding (phân mảnh)**: chia dữ liệu ra nhiều máy, mỗi máy giữ một phần (như sơ đồ trên: user A–H ở máy 1...). Giúp chứa được **nhiều dữ liệu hơn** và **chia tải ghi**.
- **Replication (nhân bản)**: sao chép **cùng một dữ liệu** sang nhiều máy. Một máy chết thì máy khác thay thế; đồng thời chia tải đọc.

Khi dữ liệu đã bị chia ra nhiều máy, JOIN và transaction giữa các máy trở nên đắt đỏ. Vì vậy NoSQL thường **thiết kế dữ liệu sao cho 1 truy vấn chỉ cần đọc ở 1 chỗ** — chấp nhận trùng lặp dữ liệu để đổi lấy tốc độ và khả năng scale ngang.

> Lưu ý: "NoSQL" nên hiểu là **"Not only SQL"** — không phải "chống SQL". Nhiều hệ thống thực tế dùng cả hai.

### 4.2. Document Database là gì?

NoSQL có nhiều loại khác nhau. Trong khóa học này, ta chỉ tập trung vào loại phổ biến nhất cho ứng dụng web: **Document Database** (cơ sở dữ liệu dạng tài liệu).

Ý tưởng cốt lõi: thay vì chia thông tin của một đối tượng ra nhiều bảng rồi JOIN lại, document DB lưu **toàn bộ thông tin của một đối tượng trong một "tài liệu" (document)** có cấu trúc giống JSON — bên trong có thể chứa object lồng nhau và mảng.

```
 SQL: dữ liệu của An nằm rải ở 3 bảng             Document DB: gom vào 1 document

 users            user_profiles                   {
 +----+------+    +---------+---------------+       _id: 1,
 | id | name |    | user_id | bio           |       name: "An",
 +----+------+    +---------+---------------+       profile: { bio: "Thích Node.js" },
 | 1  | An   |    | 1       | Thích Node.js |       addresses: [
 +----+------+    +---------+---------------+         { city: "Hà Nội" },
                                                      { city: "Đà Nẵng" }
 addresses                                          ]
 +---------+---------+                            }
 | user_id | city    |
 +---------+---------+
 | 1       | Hà Nội  |
 | 1       | Đà Nẵng |
 +---------+---------+

 => Đọc hồ sơ An: JOIN 3 bảng                     => Đọc hồ sơ An: lấy 1 document
```

Vì sao document DB hợp với Node.js:
- **Document ≈ object JavaScript** — lấy ra là dùng được ngay, không cần chuyển đổi.
- **Dữ liệu liên quan nằm cùng một chỗ** — đọc 1 lần là đủ, và dễ chia ra nhiều máy (mục 4.1).
- **Schema linh hoạt** — thêm field mới không cần sửa cấu trúc cả collection (mục 4.5).

Các document DB tiêu biểu: **MongoDB** (phổ biến nhất, dùng trong khóa học này), Google Firestore, CouchDB. Từ đây trở đi, ta dùng MongoDB làm ví dụ.

### 4.3. Khái niệm cốt lõi trong MongoDB

MongoDB lưu dữ liệu thành các **document** (tài liệu) có dạng giống JSON, gom nhóm trong các **collection**:

```
MongoDB Server (localhost:27017)
 |
 +-- Database: shop_db
       +-- Collection: users
       |     +-- Document { _id: ObjectId("..."), name: "An", ... }
       |     +-- Document { _id: ObjectId("..."), name: "Bình", ... }
       |
       +-- Collection: orders
             +-- Document { _id: ObjectId("..."), user_id: ..., total: 200000 }
```

- **Database**: giống SQL — thùng chứa các collection của 1 ứng dụng.
- **Collection**: nhóm các document cùng loại — tương đương **bảng**, nhưng không bắt buộc cùng cấu trúc.
- **Document**: một bản ghi — tương đương **row**, nhưng có thể chứa object lồng nhau và mảng.
- **Field**: một cặp `key: value` trong document — tương đương **column**.
- **`_id`**: khóa chính, bắt buộc có trong mọi document. Nếu không truyền vào, MongoDB tự sinh một **`ObjectId`** — giá trị 12 byte (hiển thị thành 24 ký tự hex), phần đầu chứa thời điểm tạo nên gần như không bao giờ trùng.
- **BSON (Binary JSON)**: định dạng MongoDB thực sự dùng để lưu. Nhìn giống JSON nhưng có thêm kiểu dữ liệu: `ObjectId`, `Date`, `Int32`, `Int64`, `Decimal128`...
- Mỗi document tối đa **16 MB** — giới hạn này ảnh hưởng tới quyết định "nhúng hay tham chiếu" (mục 4.6).

So sánh thuật ngữ:

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` |
| Foreign Key | Reference (lưu `_id` của document khác) — **DB không tự kiểm tra** tồn tại |
| JOIN | Embed (khỏi cần join), hoặc `$lookup` / `populate()` của Mongoose |
| Index | Index |
| `CREATE TABLE` + schema | Không bắt buộc; có thể dùng `$jsonSchema` hoặc Mongoose Schema |

Ví dụ 1 document user:

```js
// Collection: users
{
  _id: ObjectId("665f1a2b3c4d5e6f7a8b9c0d"),
  name: "An",
  email: "an@example.com",
  age: 22,
  profile: {                              // embedded document (quan hệ 1:1)
    bio: "Thích Node.js",
    avatar: "https://example.com/an.png"
  },
  addresses: [                            // mảng embedded documents (1:N, số lượng ít)
    { label: "Nhà",     city: "Hà Nội" },
    { label: "Công ty", city: "Hà Nội" }
  ],
  tags: ["vip", "newsletter"]             // mảng giá trị đơn giản
}
```

Điểm khác biệt cốt lõi so với SQL: thay vì **tách** profile và địa chỉ ra bảng riêng rồi JOIN, MongoDB cho phép **nhúng (embed)** trực tiếp vào document `user`. Một lần đọc là có đủ dữ liệu, không cần ráp.

### 4.4. CRUD trong MongoDB so với SQL

| CRUD | SQL | MongoDB (mongosh) |
|---|---|---|
| Create | `INSERT INTO users (name, age) VALUES ('Dũng', 30);` | `db.users.insertOne({ name: "Dũng", age: 30 })` |
| Read | `SELECT * FROM users WHERE age > 20;` | `db.users.find({ age: { $gt: 20 } })` |
| Update | `UPDATE users SET age = 23 WHERE name = 'An';` | `db.users.updateOne({ name: "An" }, { $set: { age: 23 } })` |
| Delete | `DELETE FROM users WHERE name = 'Chi';` | `db.users.deleteOne({ name: "Chi" })` |

Câu truy vấn MongoDB chính là **object JavaScript** — đây là lý do nó rất hợp với Node.js.

### 4.5. Schema linh hoạt (flexible schema)

MongoDB không bắt buộc mọi document trong cùng 1 collection phải có cùng cấu trúc:

```js
// Document 1
{ name: "An", email: "an@example.com" }

// Document 2 — vẫn hợp lệ, dù thiếu email và có thêm field "phone"
{ name: "Bình", phone: "0901234567" }
```

Đây là con dao hai lưỡi: linh hoạt khi sản phẩm còn thay đổi nhanh, nhưng dễ dẫn tới dữ liệu "hỗn loạn" nếu không có kỷ luật. Vì vậy trong thực tế ta vẫn đặt ràng buộc, theo một trong hai cách:
- **Ở tầng database** — dùng `$jsonSchema` validator của MongoDB:
  ```js
  db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email"],
        properties: { email: { bsonType: "string" } }
      }
    }
  })
  ```
- **Ở tầng ứng dụng** — định nghĩa **Schema** bằng Mongoose (sẽ học ở bài sau). Đây là cách phổ biến nhất trong dự án Node.js.

Vì thế gọi MongoDB là "schema-less" (không có schema) là chưa chính xác — đúng hơn là **"flexible schema"**: schema không bị ép buộc từ đầu, nhưng ta có thể và nên tự đặt ra.

### 4.6. Các loại quan hệ trong MongoDB: embed hay reference?

MongoDB vẫn biểu diễn được cả 4 loại quan hệ ở mục 3.6, bằng 2 công cụ:
- **Embed (nhúng)**: đặt dữ liệu liên quan ngay trong document cha.
- **Reference (tham chiếu)**: lưu `_id` của document bên kia — giống foreign key, nhưng **MongoDB không tự kiểm tra** `_id` đó có tồn tại hay không (không có referential integrity như SQL).

| Quan hệ | Ví dụ | Cách làm phổ biến trong MongoDB |
|---|---|---|
| 1:1 | user – profile | **Embed** `profile` vào user |
| 1:N (ít, có giới hạn) | user – vài địa chỉ | **Embed** mảng `addresses` vào user |
| 1:N (nhiều, tăng mãi) | user – đơn hàng | **Reference**: mỗi order lưu `user_id` |
| N:1 | products – category | **Reference**: mỗi product lưu `category_id` |
| N:N | orders – products | **Mảng reference**: order chứa `items: [{ product_id, qty }]` |

Ví dụ reference — đơn hàng trỏ tới user và sản phẩm:

```js
// Collection: orders
{
  _id: ObjectId("66a0c1d2e3f4a5b6c7d8e9f0"),
  user_id: ObjectId("665f1a2b3c4d5e6f7a8b9c0d"),     // reference tới users (N:1)
  items: [                                             // N:N: mỗi item trỏ tới 1 product
    { product_id: ObjectId("..."), name: "Áo thun",    price: 100000, qty: 2 },
    { product_id: ObjectId("..."), name: "Quần jeans", price: 350000, qty: 1 }
  ],
  total: 550000
}
```

Để ý `name` và `price` của sản phẩm được **chép** vào đơn hàng. Đây là **denormalization** (phi chuẩn hóa) có chủ đích — ngược với mục 3.9: giá sản phẩm có thể đổi sau này, nhưng đơn hàng cần giữ đúng giá **tại thời điểm mua**, và hiển thị đơn không cần tra thêm collection `products`.

Nguyên tắc chọn nhanh:
- **Embed** khi dữ liệu con **luôn được đọc cùng** cha, số lượng **ít và có giới hạn**, và không cần truy cập độc lập.
- **Reference** khi dữ liệu con **nhiều hoặc tăng không giới hạn** (có nguy cơ vượt 16 MB), **thay đổi độc lập**, hoặc được **nhiều document khác cùng dùng chung**.

Khi dùng reference mà cần ráp dữ liệu, MongoDB có `$lookup` (tương tự JOIN) trong aggregation, còn Mongoose có `populate()`:

```js
db.orders.aggregate([
  { $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" } }
])
```

### 4.7. Transaction trong MongoDB

- Mọi thao tác ghi trên **1 document** luôn là **atomic** — đây là lý do embed giúp an toàn: cập nhật user cùng địa chỉ của họ chỉ là 1 lần ghi.
- MongoDB hỗ trợ **transaction ACID trên nhiều document** từ phiên bản 4.0 (replica set) và 4.2 (sharded cluster). Tuy vậy, transaction nhiều document chậm hơn — nếu thiết kế tốt thì phần lớn thao tác chỉ cần chạm 1 document.

### 4.8. Nhất quán dữ liệu khi chạy trên nhiều máy (CAP và BASE)

Khi dữ liệu nằm trên **nhiều máy** (replication, sharding ở mục 4.1), giữ cho mọi máy luôn đồng bộ tức thì là rất khó. **Định lý CAP** phát biểu: trong hệ phân tán, khi đường mạng giữa các máy bị đứt (**P**artition — điều chắc chắn sẽ có lúc xảy ra), hệ thống buộc phải chọn một trong hai:

- **C — Consistency (Nhất quán)**: mọi máy luôn trả về dữ liệu mới nhất; nếu không chắc chắn thì **từ chối trả lời**.
- **A — Availability (Sẵn sàng)**: luôn trả lời, dù dữ liệu **có thể hơi cũ**.

Nhiều hệ NoSQL phân tán chọn ưu tiên **A**, theo triết lý **BASE**:
- **B**asically **A**vailable — hệ thống luôn phản hồi.
- **S**oft state — trạng thái dữ liệu có thể thay đổi trong lúc các máy đang đồng bộ.
- **E**ventually consistent (**nhất quán cuối cùng**) — sau một khoảng thời gian ngắn, mọi máy sẽ có cùng dữ liệu.

Ví dụ đời thường: bạn bấm "like" một bài viết, bạn thấy 101 lượt like, nhưng người ở nơi khác vài giây sau mới thấy con số đó. Với lượt like thì chấp nhận được; với **số dư tài khoản ngân hàng** thì không — đó là lý do ngân hàng chọn ACID.

**MongoDB nằm ở đâu?** MongoDB thường chạy dưới dạng **replica set**: 1 máy **primary** nhận mọi thao tác ghi, các máy **secondary** sao chép lại dữ liệu từ primary.
- Mặc định mọi thao tác đọc/ghi đi qua **primary** → dữ liệu đọc được luôn là mới nhất (ưu tiên **C**).
- Nếu cấu hình cho phép đọc từ **secondary** (để chia tải đọc), dữ liệu có thể chậm hơn primary một chút — đó chính là eventual consistency.

| | ACID | BASE |
|---|---|---|
| Ưu tiên | Đúng tuyệt đối, ngay lập tức | Luôn phản hồi, scale lớn |
| Đánh đổi | Khó scale ra nhiều máy | Dữ liệu có thể tạm thời chưa đồng bộ |
| Gặp ở | SQL database; MongoDB khi dùng transaction | Hệ NoSQL phân tán ưu tiên tính sẵn sàng; MongoDB khi đọc từ secondary |

> Đây là **xu hướng**, không phải ranh giới tuyệt đối: MongoDB có transaction ACID, và cũng có những SQL database được thiết kế để chạy phân tán (CockroachDB, Google Spanner).

---

## 5. So sánh SQL và MongoDB

| Tiêu chí | SQL | MongoDB |
|---|---|---|
| Cấu trúc | Bảng, hàng, cột | Collection, document (lồng nhau được) |
| Schema | Bắt buộc, định nghĩa trước; đổi schema bằng `ALTER TABLE` | Linh hoạt; ràng buộc bằng `$jsonSchema` hoặc Mongoose |
| Quan hệ | Foreign key + JOIN; DB tự đảm bảo toàn vẹn tham chiếu | Embed hoặc reference; toàn vẹn tham chiếu do ứng dụng tự lo |
| Thiết kế dữ liệu | Chuẩn hóa — mỗi thông tin nằm ở 1 chỗ | Thiết kế theo cách đọc — chấp nhận trùng lặp có chủ đích |
| Scale | Mạnh trên 1 máy + read replica; sharding cần thêm công cụ | Hỗ trợ sẵn replica set và sharding |
| Transaction (ACID) | Thế mạnh cốt lõi | Atomic trên 1 document; có transaction nhiều document (từ bản 4.0) |
| Làm việc với Node.js | Qua driver (`pg`, `mysql2`) hoặc ORM (Prisma, Sequelize) | Qua driver `mongodb` hoặc ODM Mongoose — document ≈ object JS |
| Ví dụ use case | Ngân hàng, kế toán, ERP, hệ thống đặt vé | Web app, CMS, catalog sản phẩm, MVP |

### Khi nào chọn SQL, khi nào chọn MongoDB?

- Chọn **SQL** khi: dữ liệu có nhiều quan hệ chặt chẽ, cần nhiều truy vấn JOIN/báo cáo phức tạp, hoặc cần giao dịch chính xác tuyệt đối (tiền, tồn kho).
- Chọn **MongoDB** khi: dữ liệu tự nhiên có dạng object lồng nhau, cấu trúc hay thay đổi (ví dụ catalog sản phẩm — mỗi loại một bộ thuộc tính riêng), cần làm nhanh MVP với Node.js, hoặc dữ liệu lớn cần scale ngang.
- Với phần lớn web app thông thường, **cả hai đều làm tốt** — điều quan trọng hơn là **thiết kế dữ liệu đúng** (mục 3.6 và 4.6).

---

## 6. Bảng thuật ngữ nhanh

| Thuật ngữ | Giải thích ngắn |
|---|---|
| Database | Tập hợp dữ liệu có tổ chức của một ứng dụng |
| DBMS | Phần mềm quản lý database (MySQL, PostgreSQL, MongoDB...) |
| Entity | Đối tượng cần lưu thông tin (User, Product...) → thành table/collection |
| Attribute | Đặc điểm của entity (name, email...) → thành column/field |
| Document Database | Loại NoSQL lưu mỗi đối tượng thành 1 document giống JSON (MongoDB) |
| Table / Collection | Nơi chứa các bản ghi cùng loại (SQL / MongoDB) |
| Row / Document | Một bản ghi cụ thể (SQL / MongoDB) |
| Column / Field | Một thuộc tính của bản ghi (SQL / MongoDB) |
| Schema | Bản thiết kế cấu trúc dữ liệu: tên cột, kiểu, ràng buộc |
| Constraint | Luật DB tự kiểm tra: NOT NULL, UNIQUE, CHECK... |
| Primary Key (PK) | Cột định danh duy nhất mỗi bản ghi, không trùng, không NULL |
| Foreign Key (FK) | Cột lưu khóa chính của bảng khác để liên kết |
| Composite Key | Khóa gồm nhiều cột kết hợp |
| Junction table | Bảng trung gian để biểu diễn quan hệ N:N |
| JOIN | Ráp dữ liệu từ nhiều bảng theo khóa |
| Index | "Mục lục" giúp tìm kiếm nhanh, đổi lại ghi chậm hơn một chút |
| Normalization | Tách bảng để tránh trùng lặp, mâu thuẫn |
| Denormalization | Chủ động lưu trùng dữ liệu để đọc nhanh hơn |
| Transaction | Nhóm lệnh thực hiện "tất cả hoặc không gì cả" |
| ACID | Atomicity, Consistency, Isolation, Durability |
| BSON | Định dạng nhị phân giống JSON mà MongoDB dùng để lưu |
| ObjectId | Kiểu `_id` mặc định của MongoDB, 12 byte, tự sinh |
| Embed / Reference | Nhúng dữ liệu vào document / lưu `_id` để trỏ sang document khác |
| Scale dọc / ngang | Nâng cấp 1 máy / thêm nhiều máy |
| Sharding | Chia dữ liệu ra nhiều máy |
| Replication | Sao chép cùng dữ liệu sang nhiều máy |
| Replica set | Nhóm máy MongoDB giữ cùng dữ liệu: 1 primary nhận ghi, các secondary sao chép lại |
| BASE / Eventual consistency | Ưu tiên luôn phản hồi; dữ liệu đồng bộ sau một khoảng thời gian ngắn |
| Driver / ORM / ODM | Thư viện để code kết nối và làm việc với DB |

---

## 7. Câu hỏi tự kiểm tra

1. Vì sao không nên lưu dữ liệu ứng dụng thật vào một file JSON?
2. Phân biệt Entity, Attribute với Table, Row, Column.
3. Khóa chính cần thỏa mãn những điều kiện gì? Vì sao nên dùng `id` tự sinh thay vì `email` làm khóa chính?
4. Hệ thống quản lý thư viện có: *Độc giả*, *Sách*, *Phiếu mượn*, *Tác giả*. Xác định loại quan hệ giữa: Độc giả – Phiếu mượn; Sách – Tác giả (1 sách có thể có nhiều tác giả). Khóa ngoại đặt ở đâu?
5. 1:N và N:1 khác nhau như thế nào?
6. Trong MongoDB, bài viết blog và các bình luận của nó nên embed hay reference? Nếu bài viết có thể có hàng chục nghìn bình luận thì sao?
7. Trong document đơn hàng ở mục 4.6, vì sao lại chép `name` và `price` của sản phẩm vào, thay vì chỉ lưu `product_id`?
8. "Eventual consistency" là gì? Cho một ví dụ chấp nhận được và một ví dụ không chấp nhận được.

<details>
<summary>Gợi ý đáp án</summary>

1. Phải đọc cả file khi tìm kiếm; ghi đồng thời bị ghi đè; crash giữa chừng làm hỏng file; không có index, phân quyền, ràng buộc.
2. Entity/Attribute là khái niệm ở **mức thiết kế** (thế giới thực); Table/Row/Column là cách chúng được **lưu trong SQL DB**: Entity → Table, entity instance → Row, Attribute → Column.
3. Duy nhất, không NULL, ổn định. Email có thể thay đổi, khi đó khóa chính và mọi khóa ngoại trỏ tới nó đều phải sửa theo.
4. Độc giả – Phiếu mượn là **1:N**, FK `reader_id` đặt ở bảng phiếu mượn. Sách – Tác giả là **N:N**, cần bảng trung gian `book_authors(book_id, author_id)`.
5. Là cùng một quan hệ, chỉ khác góc nhìn: "users 1:N orders" chính là "orders N:1 users". Khóa ngoại luôn ở phía N.
6. Ít bình luận, luôn hiển thị cùng bài: có thể embed. Hàng chục nghìn bình luận: phải reference (collection `comments` lưu `post_id`) để tránh document phình to và vượt giới hạn 16 MB.
7. Để giữ đúng giá **tại thời điểm mua** (giá sản phẩm có thể đổi sau này), và để hiển thị đơn hàng mà không cần tra thêm collection `products`. Đây là **denormalization** có chủ đích.
8. Dữ liệu giữa các máy sẽ đồng bộ **sau một khoảng thời gian ngắn** chứ không tức thì. Chấp nhận được: số lượt like, lượt xem. Không chấp nhận được: số dư tài khoản, số lượng tồn kho khi thanh toán.

</details>

---

## 8. Chuẩn bị cho bài học MongoDB tiếp theo

Với nền tảng này, ở bài sau chúng ta sẽ đi vào thực hành:
- Cài đặt MongoDB (local hoặc MongoDB Atlas — cloud).
- Kết nối MongoDB với Express bằng **Mongoose** (ODM giúp định nghĩa Schema, Model).
- Thực hành CRUD: Create, Read, Update, Delete document.
- Thiết kế dữ liệu: khi nào embed, khi nào reference — áp dụng các loại quan hệ 1:1, 1:N, N:1, N:N ở mục 3.6 vào 1 project thực tế (ví dụ blog hoặc e-commerce mini).
