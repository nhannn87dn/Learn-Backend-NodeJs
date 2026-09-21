# Tổng quan về Database — Từ SQL đến MongoDB


## 1. Database là gì, và tại sao ứng dụng cần nó?

Đến giờ các bạn đã biết Express giúp mình xây dựng API — nhận request, xử lý logic, trả response. Nhưng có một vấn đề: **mọi thứ trong RAM của Node.js sẽ mất khi server restart**. Nếu lưu user, sản phẩm, đơn hàng trong một biến JavaScript, chỉ cần `nodemon` restart một cái là bay hết dữ liệu.

**Database (cơ sở dữ liệu)** là phần mềm chuyên dụng để:
- **Lưu trữ dữ liệu lâu dài** (persistent storage) — ghi xuống đĩa, sống sót qua restart.
- **Truy vấn hiệu quả** — tìm 1 user trong 10 triệu bản ghi trong vài mili-giây nhờ index.
- **Đảm bảo tính toàn vẹn** — không cho phép dữ liệu mâu thuẫn, trùng lặp sai lệch.
- **Xử lý truy cập đồng thời** — hàng nghìn request cùng đọc/ghi mà không làm hỏng dữ liệu của nhau.
- **Bảo mật và phân quyền** — ai được đọc, ai được ghi.

Nói ngắn gọn: Express là "bộ não xử lý", Database là "bộ nhớ dài hạn".

---

## 2. Hai trường phái lớn: Relational (SQL) và Non-relational (NoSQL)

Đây là điểm phân nhánh quan trọng nhất mà học viên mới cần nắm trước khi đi sâu vào bất kỳ loại DB cụ thể nào.

| | **SQL (Relational)** | **NoSQL (Non-relational)** |
|---|---|---|
| Đơn vị lưu trữ | Bảng (Table) — hàng và cột | Nhiều mô hình: document, key-value, column, graph |
| Cấu trúc | Schema cố định, định nghĩa trước | Linh hoạt, schema-less hoặc schema động |
| Quan hệ dữ liệu | Dùng khóa ngoại (Foreign Key) để liên kết bảng | Thường nhúng (embed) dữ liệu liên quan vào nhau |
| Ví dụ | MySQL, PostgreSQL, SQL Server, Oracle | MongoDB, Redis, Cassandra, Neo4j |
| Phù hợp | Dữ liệu có cấu trúc rõ ràng, nhiều quan hệ chặt chẽ (ngân hàng, kế toán) | Dữ liệu thay đổi cấu trúc thường xuyên, cần scale ngang nhanh |

Không cái nào "tốt hơn" cái nào tuyệt đối — chúng giải quyết bài toán khác nhau. Trong MERN stack, ta học MongoDB (NoSQL) vì nó "nói chuyện" bằng JSON — rất khớp với JavaScript. Nhưng hiểu SQL trước sẽ giúp các bạn hiểu MongoDB đang **khác gì** và **đánh đổi gì**.

---

## 3. Phần I: SQL — Cơ sở dữ liệu quan hệ

### 3.1. Khái niệm cốt lõi

Hãy tưởng tượng SQL DB như một tập hợp các **bảng tính Excel** có liên kết với nhau:

- **Table (Bảng)**: giống một sheet Excel — ví dụ bảng `users`, bảng `orders`.
- **Row / Record (Hàng)**: một bản ghi cụ thể — ví dụ 1 user cụ thể.
- **Column / Field (Cột)**: một thuộc tính — ví dụ `email`, `created_at`.
- **Primary Key (Khóa chính)**: cột định danh duy nhất cho mỗi hàng (thường là `id`), không được trùng, không được null.
- **Foreign Key (Khóa ngoại)**: một cột trong bảng A trỏ đến Primary Key của bảng B, dùng để **liên kết dữ liệu giữa các bảng**.

Ví dụ minh họa:

```
Bảng users                     Bảng orders
+----+---------+              +----+---------+--------+
| id | name    |              | id | user_id | total  |
+----+---------+              +----+---------+--------+
| 1  | An      |              | 1  | 1       | 200000 |
| 2  | Bình    |              | 2  | 1       | 150000 |
+----+---------+              | 3  | 2       | 300000 |
                               +----+---------+--------+
```

Cột `user_id` trong bảng `orders` là **foreign key**, trỏ tới `id` trong bảng `users`. Đó chính là bản chất của "relational" — dữ liệu được **tách ra** thành nhiều bảng, rồi **liên kết lại** khi cần.

### 3.2. Các loại quan hệ (Relationship)

Đây là phần rất quan trọng vì nó ảnh hưởng đến cách thiết kế DB sau này (cả SQL lẫn MongoDB):

1. **One-to-One (1-1)**: 1 user có đúng 1 hồ sơ (profile) chi tiết. Ví dụ: `users` ↔ `user_profiles`.
2. **One-to-Many (1-N)**: 1 user có thể có nhiều đơn hàng, nhưng 1 đơn hàng chỉ thuộc về 1 user. Ví dụ trên chính là 1-N.
3. **Many-to-Many (N-N)**: 1 sản phẩm có thể nằm trong nhiều đơn hàng, và 1 đơn hàng có thể chứa nhiều sản phẩm. Loại này cần một **bảng trung gian** (junction table), ví dụ bảng `order_items` chứa `order_id` và `product_id`.

### 3.3. Truy vấn dữ liệu — ngôn ngữ SQL

SQL (Structured Query Language) là ngôn ngữ để "hỏi" database. Vài câu lệnh cốt lõi để có cảm giác:

```sql
-- Lấy tất cả user
SELECT * FROM users;

-- Lấy đơn hàng của user có id = 1
SELECT * FROM orders WHERE user_id = 1;

-- JOIN: kết hợp dữ liệu từ 2 bảng theo khóa ngoại
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
```

`JOIN` chính là "phép thuật" giúp ráp dữ liệu từ nhiều bảng lại thành một kết quả — đây là thứ SQL làm rất mạnh, nhưng cũng là điểm mà NoSQL thường tránh (vì join giữa nhiều bảng lớn có thể chậm khi hệ thống phình to).

### 3.4. Chuẩn hóa dữ liệu (Normalization) và ACID

- **Normalization**: nguyên tắc tách dữ liệu ra thành nhiều bảng nhỏ để **tránh trùng lặp** và **tránh mâu thuẫn dữ liệu**. Ví dụ: không lưu tên user lặp lại trong mỗi đơn hàng, mà chỉ lưu `user_id` rồi join.
- **ACID** — 4 tính chất đảm bảo giao dịch (transaction) an toàn, đặc biệt quan trọng với SQL:
  - **A**tomicity: giao dịch hoặc thực hiện toàn bộ, hoặc không gì cả (không có nửa vời).
  - **C**onsistency: dữ liệu luôn ở trạng thái hợp lệ trước và sau giao dịch.
  - **I**solation: nhiều giao dịch chạy song song không ảnh hưởng lẫn nhau.
  - **D**urability: khi đã commit, dữ liệu chắc chắn được lưu, kể cả khi mất điện.

Ví dụ kinh điển: chuyển tiền từ tài khoản A sang B — trừ tiền A và cộng tiền B phải xảy ra **cùng lúc, toàn vẹn**, không thể chỉ trừ mà không cộng.

---

## 4. Phần II: NoSQL — Cơ sở dữ liệu phi quan hệ

### 4.1. NoSQL có nhiều "họ", không chỉ một kiểu

Khác với SQL (khá đồng nhất về mô hình bảng), "NoSQL" là một cái ô lớn gồm nhiều kiểu khác nhau:

- **Document DB**: lưu dữ liệu dạng tài liệu giống JSON. → **MongoDB** (chúng ta sẽ học).
- **Key-Value DB**: lưu theo cặp khóa-giá trị đơn giản, cực nhanh. → Redis.
- **Column-family DB**: tối ưu cho ghi dữ liệu khối lượng cực lớn. → Cassandra.
- **Graph DB**: tối ưu cho dữ liệu có quan hệ phức tạp, mạng lưới. → Neo4j.

### 4.2. MongoDB — Document Database

MongoDB lưu dữ liệu thành các **document** (tài liệu) dạng giống JSON (thực chất là BSON — Binary JSON), gom nhóm trong các **collection** (tương đương "bảng" nhưng linh hoạt hơn).

So sánh thuật ngữ:

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` |

Ví dụ 1 document user trong MongoDB:

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "name": "An",
  "email": "an@example.com",
  "orders": [
    { "product": "Áo thun", "total": 200000 },
    { "product": "Quần jeans", "total": 350000 }
  ]
}
```

Điểm khác biệt cốt lõi so với SQL: thay vì **tách** đơn hàng ra bảng riêng rồi join, MongoDB cho phép **nhúng (embed)** trực tiếp mảng `orders` vào bên trong document `user`. Đây gọi là mô hình dữ liệu **denormalized** (không chuẩn hóa) — ưu tiên đọc nhanh, gom hết dữ liệu liên quan vào một chỗ, đổi lại có thể trùng lặp dữ liệu.

### 4.3. Schema linh hoạt (Schema-less)

MongoDB không bắt buộc mọi document trong cùng 1 collection phải có cùng cấu trúc:

```json
// Document 1
{ "name": "An", "email": "an@example.com" }

// Document 2 — vẫn hợp lệ, dù thiếu email, thêm field "phone"
{ "name": "Bình", "phone": "0901234567" }
```

Đây là con dao hai lưỡi: linh hoạt khi sản phẩm còn thay đổi nhanh (giai đoạn học và làm dự án nhỏ), nhưng dễ dẫn tới dữ liệu "hỗn loạn" nếu không có kỷ luật thiết kế — đó là lý do sau này khi học Mongoose, ta sẽ định nghĩa **Schema** ở tầng ứng dụng để tự áp ràng buộc.

### 4.4. Khi nào embed, khi nào reference?

MongoDB vẫn hỗ trợ tham chiếu (reference) tương tự foreign key, dùng khi:
- Dữ liệu liên quan **quá lớn** hoặc **thay đổi độc lập** (ví dụ: user và hàng nghìn đơn hàng — không nên nhét hết vào 1 document).
- Nhiều document khác cùng cần tham chiếu đến cùng 1 dữ liệu gốc.

```json
// User document
{ "_id": "u1", "name": "An" }

// Order document — reference tới user qua user_id
{ "_id": "o1", "user_id": "u1", "total": 200000 }
```

Đây chính là bài toán thiết kế dữ liệu quan trọng nhất khi học MongoDB: **embed hay reference?** — sẽ được đi sâu ở bài tiếp theo.

---

## 5. Bảng so sánh nhanh SQL vs MongoDB

| Tiêu chí | SQL | MongoDB |
|---|---|---|
| Cấu trúc | Bảng cố định | Document linh hoạt |
| Quan hệ | JOIN nhiều bảng | Embed hoặc reference |
| Schema | Bắt buộc, cố định | Linh hoạt, tự do |
| Scale | Thường scale dọc (tăng cấu hình máy) | Dễ scale ngang (nhiều máy) |
| Transaction (ACID) | Mạnh, gốc rễ thiết kế | Có hỗ trợ nhưng không phải trọng tâm |
| Hợp với JS/JSON | Cần ORM chuyển đổi | Native — document ≈ object JS |
| Ví dụ use case | Hệ thống ngân hàng, kế toán, ERP | Ứng dụng web, MVP, dữ liệu thay đổi nhanh |

---

## 6. Chuẩn bị cho bài học MongoDB tiếp theo

Với nền tảng này, ở bài sau chúng ta sẽ đi vào thực hành:
- Cài đặt MongoDB (local hoặc MongoDB Atlas — cloud).
- Kết nối MongoDB với Express bằng **Mongoose** (ODM giúp định nghĩa Schema, Model).
- Thực hành CRUD: Create, Read, Update, Delete document.
- Thiết kế dữ liệu: khi nào embed, khi nào reference — áp dụng vào 1 project thực tế (ví dụ blog hoặc e-commerce mini).
