# Fake API for React

- API URL Production: <https://learn-backend-nodejs.onrender.com>
- API URL Development: <http://localhost:9000>

## Endpoints

### Authentication

- `POST /api/v1/auth/login` - Đăng nhập user
  
  **Ví dụ request:**

  ```http
  POST http://localhost:9000/api/v1/auth/login
  content-type: application/json
  
  {
      "email": "cory.kassulkegmail.com",
      "password": "fake123456"
  }
  ```

- File test: [auth.http](./doccs/auth.http)

### Users

- `GET /api/v1/users` - Lấy danh sách users
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/users
  ```

- `GET /api/v1/users/:id` - Lấy user theo ID (Yêu cầu quyền admin)
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/users/1
  Authorization: Bearer <token>
  ```

- `POST /api/v1/users` - Tạo user mới (Yêu cầu quyền admin)
  
  **Ví dụ request:**

  ```http
  POST http://localhost:9000/api/v1/users
  content-type: application/json
  Authorization: Bearer <token>
  
  {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "Password123!",
      "active": true,
      "role": "staff"
  }
  ```

- `PUT /api/v1/users/:id` - Cập nhật user (Yêu cầu quyền admin)
  
  **Ví dụ request:**

  ```http
  PUT http://localhost:9000/api/v1/users/1
  content-type: application/json
  Authorization: Bearer <token>
  
  {
      "role": "admin"
  }
  ```

- `DELETE /api/v1/users/:id` - Xóa user (Yêu cầu quyền admin)
  
  **Ví dụ request:**

  ```http
  DELETE http://localhost:9000/api/v1/users/1
  Authorization: Bearer <token>
  ```

- File test: [user.http](./doccs/user.http)

### Brands

- `GET /api/v1/brands` - Lấy danh sách brands
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/brands
  ```

- `GET /api/v1/brands/:id` - Lấy brand theo ID
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/brands/1
  ```

- `POST /api/v1/brands` - Tạo brand mới
  
  **Ví dụ request:**

  ```http
  POST http://localhost:9000/api/v1/brands
  content-type: application/json
  
  {
      "brand_name": "Brand 6",
      "description": "Description 6",
      "slug": "brand-6"
  }
  ```

- `PUT /api/v1/brands/:id` - Cập nhật brand
  
  **Ví dụ request:**

  ```http
  PUT http://localhost:9000/api/v1/brands/6
  content-type: application/json
  
  {
      "brand_name": "Brand 16"
  }
  ```

- `DELETE /api/v1/brands/:id` - Xóa brand
  
  **Ví dụ request:**

  ```http
  DELETE http://localhost:9000/api/v1/brands/1
  ```

- File test: [brand.http](./doccs/brand.http)

### Categories

- `GET /api/v1/categories` - Lấy danh sách categories
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/categories
  ```

- `GET /api/v1/categories/:id` - Lấy category theo ID
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/categories/1
  ```

- `POST /api/v1/categories` - Tạo category mới
  
  **Ví dụ request:**

  ```http
  POST http://localhost:9000/api/v1/categories
  content-type: application/json
  
  {
      "category_name": "Category 1",
      "description": "Description 1",
      "slug": "category-1"
  }
  ```

- `PUT /api/v1/categories/:id` - Cập nhật category
  
  **Ví dụ request:**

  ```http
  PUT http://localhost:9000/api/v1/categories/1
  content-type: application/json
  
  {
      "category_name": "Category 1 Updated"
  }
  ```

- `DELETE /api/v1/categories/:id` - Xóa category
  
  **Ví dụ request:**

  ```http
  DELETE http://localhost:9000/api/v1/categories/1
  ```

- File test: [categogy.http](./doccs/categogy.http)

### Products

- `GET /api/v1/products` - Lấy danh sách products
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/products
  ```

- `GET /api/v1/products/:id` - Lấy product theo ID
  
  **Ví dụ request:**

  ```http
  GET http://localhost:9000/api/v1/products/1
  ```

- `POST /api/v1/products` - Tạo product mới
  
  **Ví dụ request:**

  ```http
  POST http://localhost:9000/api/v1/products
  content-type: application/json
  
  {
      "product_name": "Product 1",
      "price": 100,
      "discount": 10,
      "category_id": 1,
      "brand_id": 1,
      "description": "Description 1",
      "model_year": 2024,
      "stock": 50,
      "thumbnail": "https://picsum.photos/400/400",
      "slug": "product-1"
  }
  ```

- `PUT /api/v1/products/:id` - Cập nhật product
  
  **Ví dụ request:**

  ```http
  PUT http://localhost:9000/api/v1/products/1
  content-type: application/json
  
  {
      "product_name": "Product 1 Updated",
      "price": 150
  }
  ```

- `DELETE /api/v1/products/:id` - Xóa product
  
  **Ví dụ request:**

  ```http
  DELETE http://localhost:9000/api/v1/products/1
  ```

- File test: [product.http](./doccs/product.http)

## Features

- ✅ CRUD operations cho tất cả entities
- ✅ Validation với Yup schema
- ✅ Authentication & Authorization
- ✅ File-based JSON storage
- ✅ TypeScript support
- ✅ Error handling
