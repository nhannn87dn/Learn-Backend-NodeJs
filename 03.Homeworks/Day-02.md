# Bài tập: Xây dựng Products API với Express.js

## Mục tiêu

Tạo REST API cho resource `products`.

Học viên thực hành:

* `GET`, `POST`, `PUT`, `DELETE`
* `req.params`
* `req.query`
* `req.body`
* `res.json()`
* HTTP status code
* Xử lý dữ liệu trong Handler

---

## 1. GET – Lấy danh sách Products

### Route

```http
GET /products
```

### Yêu cầu

Tạo route xử lý việc lấy danh sách products.

### Client gửi

```http
GET http://localhost:3000/products
```

### Response mong muốn

```json
{
  "message": "Get products successfully"
}
```

---

# 2. GET – Lấy Product theo ID

### Route

```http
GET /products/:id
```

### Yêu cầu

Lấy `id` từ `req.params` và trả lại cho client.

### Client gửi

```http
GET http://localhost:3000/products/10
```

### Response mong muốn

```json
{
  "message": "Get product successfully",
  "id": "10"
}
```

---

# 3. POST – Tạo Product

### Route

```http
POST /products
```

### Yêu cầu

Lấy dữ liệu product từ `req.body` và trả lại chính dữ liệu client vừa gửi.

### Client gửi

```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "price": 20000000
}
```

### Response mong muốn

```json
{
  "message": "Create product successfully",
  "data": {
    "name": "iPhone 15",
    "price": 20000000
  }
}
```

---

# 4. PUT – Cập nhật Product

### Route

```http
PUT /products/:id
```

### Yêu cầu

Lấy:

* `id` từ `req.params`
* dữ liệu cập nhật từ `req.body`

Sau đó trả lại cả hai thông tin cho client.

### Client gửi

```http
PUT http://localhost:3000/products/10
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 25000000
}
```

### Response mong muốn

```json
{
  "message": "Update product successfully",
  "id": "10",
  "data": {
    "name": "iPhone 15 Pro",
    "price": 25000000
  }
}
```

---

# 5. DELETE – Xóa Product

### Route

```http
DELETE /products/:id
```

### Yêu cầu

Lấy `id` từ `req.params` và trả lại `id` cho client.

### Client gửi

```http
DELETE http://localhost:3000/products/10
```

### Response mong muốn

```json
{
  "message": "Delete product successfully",
  "id": "10"
}
```
