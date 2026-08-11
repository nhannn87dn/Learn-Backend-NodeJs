## Bước 1 - Cấu hình environment

Tạo file .env trong thư mục gốc dự án. Sau đó copy nội dung từ .env.example vào file .env và thay đổi các giá trị theo nhu cầu của bạn.

Thêm vào 1 biến môi trường mới trong file .env:

```
VITE_API_URL=http://localhost:9000/api
```

Tạo file src/config/env.ts và thêm đoạn code sau:

```ts
export const ENV = {
    API_URL: import.meta.env.VITE_API_URL
}
```

## Bước 2 - 
