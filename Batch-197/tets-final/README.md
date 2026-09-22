# ĐỀ BÀI: XÂY DỰNG RESTFUL API NÂNG CAO VỚI TYPESCRIPT, MONGOOSE & ZOD

### 1. Yêu cầu Kỹ thuật & Kiến trúc Hệ thống

#### A. Tech Stack

* **Runtime & Language:** Node.js (v18+), TypeScript (`ts-node-dev` hoặc `tsx`).
* **Framework:** Express.js.
* **Database & ORM/ODM:** MongoDB, Mongoose.
* **Validation:** Zod (Validate Request Body / Params trước khi vào Controller).
* **Error Handling:** `http-errors` (tạo HTTP Exception) + Centralized Error Handler Middleware.

#### B. Quy định Phân tầng (Architecture Guidelines)

* `server.ts`: Khởi chạy HTTP server, xử lý kết nối Database MongoDB (`mongoose.connect`).
* `app.ts`: Khởi tạo Express App, đăng ký middleware toàn cục (`express.json()`), định tuyến routes, bắt lỗi 404 Not Found và Global Error Handler.
* `routes/`: Định nghĩa endpoint, áp dụng Middleware validate dữ liệu đầu vào.
* `controllers/`: Xử lý HTTP Request/Response (lấy dữ liệu từ `req`, gọi Service, trả về response JSON). **Không viết query MongoDB trong Controller**.
* `services/`: Chứa toàn bộ Business Logic và thao tác trực tiếp với Database qua Mongoose Models.
* `models/`: Định nghĩa Mongoose Schema & Interface TypeScript cho Document.
* `validations/`: Định nghĩa các Zod Schema cho thao tác `create` và `update`.
* `middlewares/`: Chứa middleware validate request body từ Zod, 404 Handler, Error Handler.

#### C. Quy chuẩn Response JSON Đầu ra

Toàn bộ API phải tuân thủ nhất quán 1 cấu trúc JSON response chung:

* **Response Thành công (Success Response):**

```json
{
  "success": true,
  "message": "Thông báo tương ứng",
  "data": { ... } // Hoặc Array [...]
}

```

* **Response Thất bại / Lỗi (Error Response):**

```json
{
  "success": false,
  "message": "Mô tả lỗi chi tiết",
  "errors": [] // Chi tiết lỗi validation nếu có (Zod issue detail)
}

```

---

### 2. Cấu trúc Thư mục Đề xuất (Project Structure)

```text
src/
├── config/
│   └── database.ts       # Cấu hình kết nối MongoDB
├── controllers/
│   ├── article.controller.ts
│   ├── blog.controller.ts
│   └── game.controller.ts
├── middlewares/
│   ├── validate.middleware.ts  # Middleware validate req.body bằng Zod
│   ├── error.middleware.ts     # Global Error Handler
│   └── notFound.middleware.ts  # 404 Handler
├── models/
│   ├── article.model.ts
│   ├── blog.model.ts
│   └── game.model.ts
├── routes/
│   ├── article.route.ts
│   ├── blog.route.ts
│   └── game.route.ts
├── services/
│   ├── article.service.ts
│   ├── blog.service.ts
│   └── game.service.ts
├── validations/
│   ├── article.validation.ts
│   ├── blog.validation.ts
│   └── game.validation.ts
├── app.ts                 # Cấu hình Express App
└── server.ts              # Entry point khởi chạy Server

```

---

### 3. Phân công Nhiệm vụ

Mỗi bạn tạo một project riêng của mình và phụ trách 1 Resource API riêng biệt. Cụ thể:

* **Thái Huy:** Đảm nhận Resource `/api/articles`
* **Thiện Thắng:** Đảm nhận Resource `/api/blogs`
* **Gia Hoàng:** Đảm nhận Resource `/api/games`

---

### 4. Chi tiết Payload Body & Output Response Mẫu

---

#### 4.1. Resource `/api/articles` (Sinh viên: Thái Huy)

##### A. Request Body (POST / PUT)

```json
{
  "title": "Kỹ thuật nâng cao trong TypeScript",
  "summary": "Khám phá Generics và Utility Types trong TypeScript.",
  "content": "Nội dung chi tiết bài viết về TypeScript...",
  "author": "Thái Huy",
  "category": "Lập trình",
  "tags": ["typescript", "backend", "nodejs"],
  "isPublished": true
}

```

##### B. Output Response Mẫu

* **GET `/api/articles`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy danh sách bài viết thành công",
  "data": [
    {
      "_id": "66f000000000000000000101",
      "title": "Kỹ thuật nâng cao trong TypeScript",
      "summary": "Khám phá Generics và Utility Types trong TypeScript.",
      "author": "Thái Huy",
      "category": "Lập trình",
      "tags": ["typescript", "backend", "nodejs"],
      "isPublished": true,
      "createdAt": "2026-09-22T08:00:00.000Z",
      "updatedAt": "2026-09-22T08:00:00.000Z"
    }
  ]
}

```

* **GET `/api/articles/66f000000000000000000101`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy chi tiết bài viết thành công",
  "data": {
    "_id": "66f000000000000000000101",
    "title": "Kỹ thuật nâng cao trong TypeScript",
    "summary": "Khám phá Generics và Utility Types trong TypeScript.",
    "content": "Nội dung chi tiết bài viết về TypeScript...",
    "author": "Thái Huy",
    "category": "Lập trình",
    "tags": ["typescript", "backend", "nodejs"],
    "isPublished": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **POST `/api/articles`** `(201 Created)`

```json
{
  "success": true,
  "message": "Tạo bài viết mới thành công",
  "data": {
    "_id": "66f000000000000000000101",
    "title": "Kỹ thuật nâng cao trong TypeScript",
    "summary": "Khám phá Generics và Utility Types trong TypeScript.",
    "content": "Nội dung chi tiết bài viết về TypeScript...",
    "author": "Thái Huy",
    "category": "Lập trình",
    "tags": ["typescript", "backend", "nodejs"],
    "isPublished": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **PUT `/api/articles/66f000000000000000000101`** `(200 OK)`

```json
{
  "success": true,
  "message": "Cập nhật bài viết thành công",
  "data": {
    "_id": "66f000000000000000000101",
    "title": "Kỹ thuật nâng cao trong TypeScript (Đã cập nhật)",
    "summary": "Tóm tắt đã thay đổi",
    "content": "Nội dung chi tiết đã được chỉnh sửa...",
    "author": "Thái Huy",
    "category": "Lập trình",
    "tags": ["typescript", "backend", "nodejs", "express"],
    "isPublished": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T09:15:00.000Z"
  }
}

```

* **DELETE `/api/articles/66f000000000000000000101`** `(200 OK)`

```json
{
  "success": true,
  "message": "Xóa bài viết thành công",
  "data": {
    "id": "66f000000000000000000101"
  }
}

```

---

#### 4.2. Resource `/api/blogs` (Sinh viên: Thiện Thắng)

##### A. Request Body (POST / PUT)

```json
{
  "title": "Hành trình trở thành Backend Developer",
  "excerpt": "Những chia sẻ chân thực về con đường tự học lập trình.",
  "body": "Nội dung chi tiết bài blog chia sẻ kinh nghiệm...",
  "authorName": "Thiện Thắng",
  "views": 0,
  "status": "published"
}

```

##### B. Output Response Mẫu

* **GET `/api/blogs`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy danh sách blog thành công",
  "data": [
    {
      "_id": "66f000000000000000000202",
      "title": "Hành trình trở thành Backend Developer",
      "excerpt": "Những chia sẻ chân thực về con đường tự học lập trình.",
      "authorName": "Thiện Thắng",
      "views": 150,
      "status": "published",
      "createdAt": "2026-09-22T08:00:00.000Z",
      "updatedAt": "2026-09-22T08:00:00.000Z"
    }
  ]
}

```

* **GET `/api/blogs/66f000000000000000000202`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy chi tiết blog thành công",
  "data": {
    "_id": "66f000000000000000000202",
    "title": "Hành trình trở thành Backend Developer",
    "excerpt": "Những chia sẻ chân thực về con đường tự học lập trình.",
    "body": "Nội dung chi tiết bài blog chia sẻ kinh nghiệm...",
    "authorName": "Thiện Thắng",
    "views": 150,
    "status": "published",
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **POST `/api/blogs`** `(201 Created)`

```json
{
  "success": true,
  "message": "Tạo blog mới thành công",
  "data": {
    "_id": "66f000000000000000000202",
    "title": "Hành trình trở thành Backend Developer",
    "excerpt": "Những chia sẻ chân thực về con đường tự học lập trình.",
    "body": "Nội dung chi tiết bài blog chia sẻ kinh nghiệm...",
    "authorName": "Thiện Thắng",
    "views": 0,
    "status": "published",
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **PUT `/api/blogs/66f000000000000000000202`** `(200 OK)`

```json
{
  "success": true,
  "message": "Cập nhật blog thành công",
  "data": {
    "_id": "66f000000000000000000202",
    "title": "Hành trình trở thành Backend Developer (Chỉnh sửa)",
    "excerpt": "Mô tả mới...",
    "body": "Nội dung bài blog sau khi chỉnh sửa...",
    "authorName": "Thiện Thắng",
    "views": 155,
    "status": "published",
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T09:30:00.000Z"
  }
}

```

* **DELETE `/api/blogs/66f000000000000000000202`** `(200 OK)`

```json
{
  "success": true,
  "message": "Xóa blog thành công",
  "data": {
    "id": "66f000000000000000000202"
  }
}

```

---

#### 4.3. Resource `/api/games` (Sinh viên: Gia Hoàng)

##### A. Request Body (POST / PUT)

```json
{
  "title": "Elden Ring",
  "genre": "Action RPG",
  "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
  "releaseYear": 2022,
  "rating": 9.6,
  "price": 59.99,
  "isMultiplayer": true
}

```

##### B. Output Response Mẫu

* **GET `/api/games`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy danh sách game thành công",
  "data": [
    {
      "_id": "66f000000000000000000303",
      "title": "Elden Ring",
      "genre": "Action RPG",
      "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
      "releaseYear": 2022,
      "rating": 9.6,
      "price": 59.99,
      "isMultiplayer": true,
      "createdAt": "2026-09-22T08:00:00.000Z",
      "updatedAt": "2026-09-22T08:00:00.000Z"
    }
  ]
}

```

* **GET `/api/games/66f000000000000000000303`** `(200 OK)`

```json
{
  "success": true,
  "message": "Lấy chi tiết game thành công",
  "data": {
    "_id": "66f000000000000000000303",
    "title": "Elden Ring",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
    "releaseYear": 2022,
    "rating": 9.6,
    "price": 59.99,
    "isMultiplayer": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **POST `/api/games`** `(201 Created)`

```json
{
  "success": true,
  "message": "Thêm game mới thành công",
  "data": {
    "_id": "66f000000000000000000303",
    "title": "Elden Ring",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
    "releaseYear": 2022,
    "rating": 9.6,
    "price": 59.99,
    "isMultiplayer": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T08:00:00.000Z"
  }
}

```

* **PUT `/api/games/66f000000000000000000303`** `(200 OK)`

```json
{
  "success": true,
  "message": "Cập nhật thông tin game thành công",
  "data": {
    "_id": "66f000000000000000000303",
    "title": "Elden Ring: Shadow of the Erdtree",
    "genre": "Action RPG",
    "platforms": ["PC", "PlayStation 5", "Xbox Series X"],
    "releaseYear": 2024,
    "rating": 9.8,
    "price": 79.99,
    "isMultiplayer": true,
    "createdAt": "2026-09-22T08:00:00.000Z",
    "updatedAt": "2026-09-22T10:00:00.000Z"
  }
}

```

* **DELETE `/api/games/66f000000000000000000303`** `(200 OK)`

```json
{
  "success": true,
  "message": "Xóa game thành công",
  "data": {
    "id": "66f000000000000000000303"
  }
}

```

---

### 5. Yêu cầu Xử lý Lỗi Bắt buộc (Error Handling Requirements)

Hệ thống phải xử lý tập trung tất cả các trường hợp lỗi thông qua middleware bằng thư viện `http-errors`.

#### A. Trạng thái Bad Request - Validation Error từ Zod `(400 Bad Request)`

Bắt lỗi dữ liệu truyền lên không khớp Schema (Ví dụ: Thiếu field bắt buộc, sai định dạng dữ liệu).

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    {
      "field": "title",
      "message": "Title là bắt buộc và không được để trống"
    },
    {
      "field": "price",
      "message": "Price phải là số lớn hơn hoặc bằng 0"
    }
  ]
}

```

#### B. Trạng thái Resource Not Found `(404 Not Found)`

Khi gửi yêu cầu lấy/sửa/xóa một ID không tồn tại trong DB, Service phải quăng lỗi `createError(404, "...")`.

```json
{
  "success": false,
  "message": "Không tìm thấy tài nguyên với ID tương ứng"
}

```

#### C. Trạng thái Route Not Found `(404 Not Found)`

Khi client truy cập vào endpoint chưa được định nghĩa (VD: `GET /api/unknown`).

```json
{
  "success": false,
  "message": "Đường dẫn API (Route) không tồn tại"
}

```

#### D. Trạng thái Server Error `(500 Internal Server Error)`

Xử lý các lỗi ngoại lệ chưa lường trước trên Server.

```json
{
  "success": false,
  "message": "Lỗi hệ thống nội bộ, vui lòng thử lại sau"
}

```

## 6. Yêu cầu nộp bài

- Mỗi bạn tạo 1 repository riêng trên GitHub, commit code đầy đủ theo đúng cấu trúc đề bài.
- Gửi lên link repo GitHub của bạn cho giảng viên để chấm điểm vào email: nhannn@softech.vn
