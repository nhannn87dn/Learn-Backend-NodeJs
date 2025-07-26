# Fake API for React

- API URL Production: <https://learn-backend-nodejs.onrender.com>
- API URL Development: <http://localhost:9000>

## Endpoints

### Authentication

- `POST /api/v1/auth/login` - Đăng nhập user
- File test: [auth.http](./doccs/auth.http)

### Users

- `GET /api/v1/users` - Lấy danh sách users
- `GET /api/v1/users/:id` - Lấy user theo ID
- `POST /api/v1/users` - Tạo user mới
- `PUT /api/v1/users/:id` - Cập nhật user
- `DELETE /api/v1/users/:id` - Xóa user
- File test: [user.http](./doccs/user.http)

### Brands

- `GET /api/v1/brands` - Lấy danh sách brands
- `GET /api/v1/brands/:id` - Lấy brand theo ID
- `POST /api/v1/brands` - Tạo brand mới
- `PUT /api/v1/brands/:id` - Cập nhật brand
- `DELETE /api/v1/brands/:id` - Xóa brand
- File test: [brand.http](./doccs/brand.http)

### Categories

- `GET /api/v1/categories` - Lấy danh sách categories
- `GET /api/v1/categories/:id` - Lấy category theo ID
- `POST /api/v1/categories` - Tạo category mới
- `PUT /api/v1/categories/:id` - Cập nhật category
- `DELETE /api/v1/categories/:id` - Xóa category
- File test: [categogy.http](./doccs/categogy.http)

### Products

- `GET /api/v1/products` - Lấy danh sách products
- `GET /api/v1/products/:id` - Lấy product theo ID
- `POST /api/v1/products` - Tạo product mới
- `PUT /api/v1/products/:id` - Cập nhật product
- `DELETE /api/v1/products/:id` - Xóa product
- File test: [product.http](./doccs/product.http)

## Features

- ✅ CRUD operations cho tất cả entities
- ✅ Validation với Yup schema
- ✅ Authentication & Authorization
- ✅ File-based JSON storage
- ✅ TypeScript support
- ✅ Error handling
