# ĐỀ BÀI: XÂY DỰNG RESTFUL API `ARTICLES` ĐẦY ĐỦ 4 LỚP (ROUTES → CONTROLLERS → SERVICES → MODEL)

---

## 1. Mục tiêu & Yêu cầu chung

Xây dựng resource **Articles (bài viết tin tức)** bằng **Node.js + Express + TypeScript + MongoDB (Mongoose)**, tổ chức code theo **4 lớp** và tuân thủ **một chuẩn response duy nhất** (thành công lẫn lỗi). Tất cả học viên làm cùng một đề.

Tham khảo code mẫu hoàn chỉnh của resource `categories` tại `Batch-198/backend-api-ts/src`.

Tạo thêm `types/article.ts` (kiểu `Article` và `ArticleCreateDTO`, theo mẫu `types/category.ts`) và đăng ký router trong `app.ts`.

Các file dùng chung (đã có sẵn, **tái sử dụng, không viết lại**):

| File | Vai trò |
| --- | --- |
| `app.ts` | Đăng ký router, middleware `404 Not Found` và middleware xử lý lỗi tập trung |
| `helpers/responseHandler.ts` | `sendJsonSuccess`, `sendJsonError` |
| `constants/responseConstants.ts` | Hằng số `SUCCESS`, `ERROR` (statusCode + message) |

### Luồng xử lý một request

```text
Client ──► app.ts (express.json) ──► routes ──► controllers ──► services ──► model ──► MongoDB
                                                    │               │
                                                    ▼               ▼
                                      sendJsonSuccess()      throw createError()
                                                                    │
                  Client ◄── error middleware (app.ts) ◄── next(error)
```

---

## 2. Danh sách endpoint

Base URL: `/api/v1/articles`

| # | Method | Endpoint | Controller | Service | Mô tả | Status thành công |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | GET | `/api/v1/articles` | `findAll` | `findAll` | Lấy danh sách bài viết | `200 OK` |
| 2 | GET | `/api/v1/articles/:id` | `findById` | `findById` | Lấy chi tiết theo ID | `200 OK` |
| 3 | POST | `/api/v1/articles` | `create` | `create` | Tạo bài viết mới | `201 Created` |
| 4 | PUT | `/api/v1/articles/:id` | `updateById` | `updateById` | Cập nhật theo ID | `200 OK` |
| 5 | DELETE | `/api/v1/articles/:id` | `deleteById` | `deleteById` | Xóa theo ID | `200 OK` |

> `:id` là `_id` (ObjectId 24 ký tự hex) do MongoDB sinh ra, **không** phải số tự tăng.

---

## 3. Cấu trúc dữ liệu (Model `Article`)

Collection: `articles`. Schema bắt buộc có `timestamps: true` (tự sinh `createdAt`, `updatedAt`) và `versionKey: false`.

| Field | Kiểu | Required | Unique | Ràng buộc | Mặc định |
| --- | --- | --- | --- | --- | --- |
| `_id` | ObjectId | tự sinh | ✔ | | |
| `title` | String | ✔ | ✔ | `trim`, `maxLength: 255` | |
| `summary` | String | ✔ | | `maxLength: 500` | |
| `content` | String | ✔ | | | |
| `author` | String | ✔ | | `trim`, `maxLength: 100` | |
| `category` | String | ✔ | | `trim`, `maxLength: 100` | |
| `tags` | [String] | | | | `[]` |
| `isPublished` | Boolean | | | | `false` |
| `createdAt` | Date | tự sinh | | | |
| `updatedAt` | Date | tự sinh | | | |

---

## 4. Request Payload (POST / PUT)

- Header: `Content-Type: application/json`.
- `POST`: gửi đủ các field **Required** ở bảng mục 3.
- `PUT`: gửi **một phần hoặc toàn bộ** field cần sửa; field không gửi giữ nguyên giá trị cũ.

Body mẫu:

```json
{
  "title": "Hướng dẫn tổ chức Route trong Express.js",
  "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
  "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
  "author": "Nguyễn Văn A",
  "category": "Lập trình Backend",
  "tags": ["nodejs", "express", "javascript"],
  "isPublished": true
}
```

---

## 5. Chuẩn hóa cấu trúc response

**Mọi** response (thành công hoặc lỗi) đều có đúng 4 key, cùng thứ tự:

| Key | Kiểu | Thành công | Lỗi |
| --- | --- | --- | --- |
| `success` | boolean | `true` | `false` |
| `statusCode` | number | Trùng HTTP status (200, 201) | Trùng HTTP status (400, 404, 409, 500...) |
| `message` | string | Thông báo thành công | Mô tả lỗi, dễ hiểu với client |
| `data` | object \| array \| null | Dữ liệu trả về | **`null`** |

Quy tắc:

1. Thành công **bắt buộc** dùng `sendJsonSuccess(res, data, status?)`; không tự gọi `res.status().json()` trong controller.
2. Lỗi **bắt buộc** đi qua `next(error)` → middleware lỗi trong `app.ts`; không tự trả lỗi rải rác ở controller.
3. Middleware lỗi phải trả đủ `success`, `statusCode`, `message`, `data: null` (code mẫu hiện chưa có `data` — cần bổ sung cho đồng nhất).
4. Không lộ `stack trace` hay thông điệp nội bộ của MongoDB cho client với lỗi 5xx; chỉ ghi `console.error` ở môi trường `development`.
5. `DELETE` trả về bài viết vừa xóa trong `data`.

### 5.1. Mẫu response thành công

**GET `/api/v1/articles` — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "_id": "6650f1c2a1b2c3d4e5f60001",
      "title": "Hướng dẫn tổ chức Route trong Express.js",
      "summary": "Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.",
      "content": "Nội dung chi tiết về việc sử dụng express.Router() để tách file...",
      "author": "Nguyễn Văn A",
      "category": "Lập trình Backend",
      "tags": ["nodejs", "express", "javascript"],
      "isPublished": true,
      "createdAt": "2026-03-21T03:00:00.000Z",
      "updatedAt": "2026-03-21T03:00:00.000Z"
    }
  ]
}
```

**POST `/api/v1/articles` — 201**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Resource created successfully",
  "data": { "_id": "6650f1c2a1b2c3d4e5f60002", "title": "Hướng dẫn tổ chức Route trong Express.js", "...": "..." }
}
```

**GET `/:id` / PUT `/:id` / DELETE `/:id` — 200**: cùng khung như trên, `data` là object bài viết (với `DELETE` là bài viết đã xóa).

### 5.2. Mẫu response lỗi

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Article not found",
  "data": null
}
```

---

## 6. Xử lý lỗi (Error Handling) — bắt buộc

Lỗi được `throw createError(status, message)` (package `http-errors`) ở **service**, hoặc do Mongoose/Express phát sinh, rồi được **middleware lỗi tập trung** trong `app.ts` chuyển thành response chuẩn ở mục 5.

### 6.1. Lỗi 4xx (lỗi phía client)

| Status | Tình huống | Cách kích hoạt để test | Message gợi ý | Nơi xử lý |
| --- | --- | --- | --- | --- |
| `400 Bad Request` | `:id` không phải ObjectId hợp lệ (Mongoose `CastError`) | `GET /api/v1/articles/abc` | `Invalid ID format` | Service/middleware |
| `400 Bad Request` | Thiếu field required / sai kiểu / vi phạm `maxLength` (Mongoose `ValidationError`) | `POST` thiếu `title` | Gộp tên field lỗi, VD `title is required` | Middleware |
| `400 Bad Request` | Body JSON sai cú pháp (lỗi do `express.json()`) | Gửi `{ "title": ` | `Invalid JSON body` | Middleware |
| `400 Bad Request` | `PUT` với body rỗng `{}` | `PUT` không có field nào | `Request body must not be empty` | Service |
| `404 Not Found` | `:id` hợp lệ nhưng không tồn tại (GET/PUT/DELETE) | ID `6650f1c2a1b2c3d4e5f6ffff` | `Article not found` | Service |
| `404 Not Found` | Route không tồn tại | `GET /api/v1/unknown` | `Not Found` | `app.ts` |
| `409 Conflict` | Vi phạm `unique` (Mongo mã `11000`) | `POST` 2 lần cùng `title` | `title already exists` | Middleware |

> Lưu ý sửa so với code mẫu: `categories.service.ts` hiện đang `throw createError(400, "Category not found")`. Theo chuẩn REST, không tìm thấy phải là **`404`**. Resource `articles` phải dùng `404`.

### 6.2. Lỗi 5xx (lỗi phía server)

| Status | Tình huống | Cách kích hoạt để test | Message trả về client |
| --- | --- | --- | --- |
| `500 Internal Server Error` | Lỗi không lường trước (exception chưa bắt, lỗi runtime) | Tạm `throw new Error("boom")` trong service | `Internal server error` (**không** lộ chi tiết) |
| `500 Internal Server Error` | Lỗi truy vấn DB không phân loại được | Dừng MongoDB rồi gọi `GET` danh sách | `Internal server error` |
| `503 Service Unavailable` *(khuyến khích)* | Mất kết nối DB (`MongoNetworkError`) | Dừng MongoDB khi server đang chạy | `Database unavailable` |

### 6.3. Bảng ánh xạ lỗi trong middleware (gợi ý triển khai)

| Nhận diện lỗi | Status trả về |
| --- | --- |
| `err.status` / `err.statusCode` có sẵn (từ `createError`, `express.json`) | Giữ nguyên |
| `err.name === "CastError"` | `400` |
| `err.name === "ValidationError"` | `400` |
| `err.code === 11000` | `409` |
| Còn lại | `500` (message cố định) |

---

## 97. Hình thức nộp bài

- Commit theo từng lớp: `model` → `service` → `controller` → `route` → `error handling`.
- Nộp: link repository Git + file gọi API `articles.http`.
