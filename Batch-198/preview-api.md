# ĐỀ BÀI: XÂY DỰNG RESTFUL API CƠ BẢN VỚI EXPRESS ROUTER

### 1. Mục tiêu & Yêu cầu chung

Mục tiêu của bài tập là xây dựng ứng dụng Backend cơ bản bằng **Node.ts** và **Express.ts**, áp dụng `express.Router()` để tổ chức tuyến đường (route) tách biệt cho từng tài nguyên (resource).

**Yêu cầu kỹ thuật:**

* Sử dụng cấu trúc dự án mô-đun hóa các router riêng biệt.
* Cài đặt middleware `express.tson()` để đọc dữ liệu từ `req.body`.
* Mỗi tài nguyên phải thực hiện đủ 5 hoạt động CRUD chuẩn RESTful:
* `GET /api/<resource>`: Lấy danh sách tất cả các bản ghi.
* `GET /api/<resource>/:id`: Lấy chi tiết một bản ghi theo ID.
* `POST /api/<resource>`: Tạo mới một bản ghi (sử dụng dữ liệu gửi qua Request Body).
* `PUT /api/<resource>/:id`: Cập nhật bản ghi theo ID (sử dụng dữ liệu gửi qua Request Body).
* `DELETE /api/<resource>/:id`: Xóa bản ghi theo ID.



**Gợi ý cấu trúc thư mục:**

```text
project-express/
├── src/
│   ├── routes/
│   │   ├── article.route.ts
│   │   ├── blog.route.ts
│   │   ├── user.route.ts
│   │   └── game.route.ts
│   └── app.ts
├── package.json


```

---

### 2. Phân công Nhiệm vụ

* **Phúc:** Đảm nhận Route `/api/articles` (Bài viết tin tức/chuyên môn)
* **Khánh:** Đảm nhận Route `/api/blogs` (Bài viết blog cá nhân)
* **Hồng:** Đảm nhận Route `/api/users` (Quản lý người dùng)
* **Long:** Đảm nhận Route `/api/games` (Danh mục trò chơi)

---

### 3. Mẫu JSON Payload Body cho các thao tác POST / PUT

#### 3.1. Resource `/articles` (Đảm nhận: Phúc)

```json
{
  "title": "Hướng dẫn tổ chức Route trong Express.ts",
  "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
  "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
  "author": "Phúc Nguyễn",
  "category": "Lập trình Backend",
  "tags": ["nodejs", "express", "javascript"],
  "isPublished": true
}

```

#### 3.2. Resource `/blogs` (Đảm nhận: Khánh)

```json
{
  "title": "Nhật ký học Web tuần đầu tiên",
  "excerpt": "Những trải nghiệm thú vị khi lần đầu tự tạo API cho riêng mình.",
  "body": "Hôm nay tôi đã hoàn thành bài tập Router trong Express...",
  "authorName": "Khánh Trần",
  "views": 120,
  "status": "published"
}

```

#### 3.3. Resource `/users` (Đảm nhận: Hồng)

```json
{
  "username": "hong_nguyen",
  "email": "hong.nguyen@example.com",
  "fullName": "Nguyễn Thị Hồng",
  "age": 20,
  "role": "student",
  "isActive": true
}

```

#### 3.4. Resource `/games` (Đảm nhận: Long)

```json
{
  "title": "Black Myth: Wukong",
  "genre": "Action RPG",
  "platforms": ["PC", "PlayStation 5"],
  "releaseYear": 2024,
  "rating": 9.5,
  "price": 59.99,
  "isMultiplayer": false
}

```