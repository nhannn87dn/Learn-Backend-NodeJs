# ĐỀ BÀI: XÂY DỰNG RESTFUL API CƠ BẢN VỚI EXPRESS ROUTER

---

### 1. Mục tiêu & Yêu cầu chung

Mục tiêu của bài tập là xây dựng ứng dụng Backend cơ bản bằng **Node.js** và **Express.js**, áp dụng `express.Router()` để tổ chức tuyến đường (route) tách biệt cho từng tài nguyên (resource).

#### Yêu cầu kỹ thuật:

* Cấu trúc dự án dạng mô-đun (mỗi resource một router riêng).
* Sử dụng middleware `express.json()` để xử lý Request Body.
* Trả về phản hồi định dạng **JSON** kèm HTTP Status Code chuẩn RESTful (200, 201, 404,...).
* Thực hiện đủ 5 hoạt động CRUD:
1. `GET /api/<resource>`: Lấy danh sách (Status `200 OK`).
2. `GET /api/<resource>/:id`: Lấy chi tiết theo ID (Status `200 OK` hoặc `404 Not Found`).
3. `POST /api/<resource>`: Tạo mới (Status `201 Created`).
4. `PUT /api/<resource>/:id`: Cập nhật theo ID (Status `200 OK`).
5. `DELETE /api/<resource>/:id`: Xóa theo ID (Status `200 OK`).



#### Cấu trúc thư mục gợi ý:

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

* **Phúc:** Đảm nhận Route `/api/articles` (Bài viết tin tức)
* **Khánh:** Đảm nhận Route `/api/blogs` (Bài viết blog cá nhân)
* **Hồng:** Đảm nhận Route `/api/users` (Quản lý người dùng)
* **Long:** Đảm nhận Route `/api/games` (Danh mục trò chơi)

---

### 3. Chi tiết Request Payload & Expected Response Mẫu

---

#### 3.1. Resource `/api/articles` (Sinh viên: Phúc)

##### A. Request Body (POST / PUT)

```json
{
  "title": "Hướng dẫn tổ chức Route trong Express.js",
  "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
  "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
  "author": "Phúc Nguyễn",
  "category": "Lập trình Backend",
  "tags": ["nodejs", "express", "javascript"],
  "isPublished": true
}

```

##### B. Expected Responses

* **GET `/api/articles**` (200 OK)
```json
{
  "message": "Lấy danh sách bài viết thành công",
  "data": [
    {
      "id": 1,
      "title": "Hướng dẫn tổ chức Route trong Express.js",
      "author": "Phúc Nguyễn",
      "category": "Lập trình Backend",
      "isPublished": true
    }
  ]
}

```


* **GET `/api/articles/1**` (200 OK)
```json
{
  "message": "Lấy chi tiết bài viết thành công",
  "data": {
    "id": 1,
    "title": "Hướng dẫn tổ chức Route trong Express.js",
    "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
    "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
    "author": "Phúc Nguyễn",
    "category": "Lập trình Backend",
    "tags": ["nodejs", "express", "javascript"],
    "isPublished": true,
    "createdAt": "2026-03-21T08:00:00.000Z"
  }
}

```


* **POST `/api/articles**` (201 Created)
```json
{
  "message": "Tạo bài viết mới thành công",
  "data": {
    "id": 2,
    "title": "Hướng dẫn tổ chức Route trong Express.js",
    "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
    "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
    "author": "Phúc Nguyễn",
    "category": "Lập trình Backend",
    "tags": ["nodejs", "express", "javascript"],
    "isPublished": true,
    "createdAt": "2026-03-21T10:00:00.000Z"
  }
}

```


* **PUT `/api/articles/1**` (200 OK)
```json
{
  "message": "Cập nhật bài viết ID 1 thành công",
  "data": {
    "id": 1,
    "title": "Hướng dẫn nâng cao về Route trong Express.js (Đã sửa)",
    "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
    "content": "Nội dung chi tiết đã được cập nhật...",
    "author": "Phúc Nguyễn",
    "category": "Lập trình Backend",
    "tags": ["nodejs", "express", "javascript", "advanced"],
    "isPublished": true,
    "updatedAt": "2026-03-21T10:30:00.000Z"
  }
}

```


* **DELETE `/api/articles/1**` (200 OK)
```json
{
  "message": "Xóa bài viết ID 1 thành công",
  "deletedId": 1
}

```



---

#### 3.2. Resource `/api/blogs` (Sinh viên: Khánh)

##### A. Request Body (POST / PUT)

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

##### B. Expected Responses

* **GET `/api/blogs**` (200 OK)
```json
{
  "message": "Lấy danh sách blog thành công",
  "data": [
    {
      "id": 1,
      "title": "Nhật ký học Web tuần đầu tiên",
      "authorName": "Khánh Trần",
      "views": 120,
      "status": "published"
    }
  ]
}

```


* **GET `/api/blogs/1**` (200 OK)
```json
{
  "message": "Lấy chi tiết blog thành công",
  "data": {
    "id": 1,
    "title": "Nhật ký học Web tuần đầu tiên",
    "excerpt": "Những trải nghiệm thú vị khi lần đầu tự tạo API cho riêng mình.",
    "body": "Hôm nay tôi đã hoàn thành bài tập Router trong Express...",
    "authorName": "Khánh Trần",
    "views": 120,
    "status": "published",
    "createdAt": "2026-03-20T14:00:00.000Z"
  }
}

```


* **POST `/api/blogs**` (201 Created)
```json
{
  "message": "Tạo blog mới thành công",
  "data": {
    "id": 2,
    "title": "Nhật ký học Web tuần đầu tiên",
    "excerpt": "Những trải nghiệm thú vị khi lần đầu tự tạo API cho riêng mình.",
    "body": "Hôm nay tôi đã hoàn thành bài tập Router trong Express...",
    "authorName": "Khánh Trần",
    "views": 0,
    "status": "published",
    "createdAt": "2026-03-21T10:00:00.000Z"
  }
}

```


* **PUT `/api/blogs/1**` (200 OK)
```json
{
  "message": "Cập nhật blog ID 1 thành công",
  "data": {
    "id": 1,
    "title": "Nhật ký học Web tuần đầu tiên (Đã cập nhật)",
    "excerpt": "Những trải nghiệm thú vị...",
    "body": "Nội dung blog đã được chỉnh sửa lại...",
    "authorName": "Khánh Trần",
    "views": 125,
    "status": "published"
  }
}

```


* **DELETE `/api/blogs/1**` (200 OK)
```json
{
  "message": "Xóa bài blog ID 1 thành công",
  "deletedId": 1
}

```



---

#### 3.3. Resource `/api/users` (Sinh viên: Hồng)

##### A. Request Body (POST / PUT)

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

##### B. Expected Responses

* **GET `/api/users**` (200 OK)
```json
{
  "message": "Lấy danh sách người dùng thành công",
  "data": [
    {
      "id": 1,
      "username": "hong_nguyen",
      "email": "hong.nguyen@example.com",
      "fullName": "Nguyễn Thị Hồng",
      "role": "student",
      "isActive": true
    }
  ]
}

```


* **GET `/api/users/1**` (200 OK)
```json
{
  "message": "Lấy thông tin người dùng thành công",
  "data": {
    "id": 1,
    "username": "hong_nguyen",
    "email": "hong.nguyen@example.com",
    "fullName": "Nguyễn Thị Hồng",
    "age": 20,
    "role": "student",
    "isActive": true,
    "createdAt": "2026-01-15T09:30:00.000Z"
  }
}

```


* **POST `/api/users**` (201 Created)
```json
{
  "message": "Thêm người dùng mới thành công",
  "data": {
    "id": 2,
    "username": "hong_nguyen",
    "email": "hong.nguyen@example.com",
    "fullName": "Nguyễn Thị Hồng",
    "age": 20,
    "role": "student",
    "isActive": true,
    "createdAt": "2026-03-21T10:00:00.000Z"
  }
}

```


* **PUT `/api/users/1**` (200 OK)
```json
{
  "message": "Cập nhật thông tin người dùng ID 1 thành công",
  "data": {
    "id": 1,
    "username": "hong_nguyen",
    "email": "hong.nguyen_updated@example.com",
    "fullName": "Nguyễn Thị Hồng",
    "age": 21,
    "role": "admin",
    "isActive": true
  }
}

```


* **DELETE `/api/users/1**` (200 OK)
```json
{
  "message": "Xóa người dùng ID 1 thành công",
  "deletedId": 1
}

```



---

#### 3.4. Resource `/api/games` (Sinh viên: Long)

##### A. Request Body (POST / PUT)

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

##### B. Expected Responses

* **GET `/api/games**` (200 OK)
```json
{
  "message": "Lấy danh sách trò chơi thành công",
  "data": [
    {
      "id": 1,
      "title": "Black Myth: Wukong",
      "genre": "Action RPG",
      "price": 59.99,
      "rating": 9.5
    }
  ]
}

```


* **GET `/api/games/1**` (200 OK)
```json
{
  "message": "Lấy chi tiết trò chơi thành công",
  "data": {
    "id": 1,
    "title": "Black Myth: Wukong",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5"],
    "releaseYear": 2024,
    "rating": 9.5,
    "price": 59.99,
    "isMultiplayer": false
  }
}

```


* **POST `/api/games**` (201 Created)
```json
{
  "message": "Thêm game mới thành công",
  "data": {
    "id": 2,
    "title": "Black Myth: Wukong",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5"],
    "releaseYear": 2024,
    "rating": 9.5,
    "price": 59.99,
    "isMultiplayer": false
  }
}

```


* **PUT `/api/games/1**` (200 OK)
```json
{
  "message": "Cập nhật trò chơi ID 1 thành công",
  "data": {
    "id": 1,
    "title": "Black Myth: Wukong (Deluxe Edition)",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
    "releaseYear": 2024,
    "rating": 9.8,
    "price": 69.99,
    "isMultiplayer": false
  }
}

```


* **DELETE `/api/games/1**` (200 OK)
```json
{
  "message": "Xóa trò chơi ID 1 thành công",
  "deletedId": 1
}

```



---

### 4. Trường hợp ngoại lệ (Không bắt buộc nhưng khuyến khích)

Nếu tìm kiếm `:id` không tồn tại ở phương thức `GET`, `PUT`, hoặc `DELETE`, hãy trả về response:

* **Status Code:** `404 Not Found`
* **Body:**
```json
{
  "message": "Không tìm thấy dữ liệu với ID tương ứng"
}

```