# Homeworks Day 02


## Task 0

1. Tạo một route khớp với request sau:

- /users/1
- /users/2
- /users/1323
- /users/17854

2. Tạo một route khớp với request sau:

- /users/tuanhung1234
- /users/124thienthan
- /users/thuctinh354
- /users/saytinh


3. Tạo một route khớp với request sau:

- /article/iphone-15-pro-max-gia-re.html
- /article/5-cong-thuc-thanh-cong-tu-chuyen-gia.html


## Task 1

Tự Tạo một ứng dụng Express.js thủ công đơn giản với các route sau:

1. Route `/` - Trả về chuỗi “Trang chủ”.
1. Route `/about` - Trả về chuỗi “Trang giới thiệu”.
1. Route `/products` - Trả về một mảng các sản phẩm. Mỗi sản phẩm bao gồm `id, name, và price`.
1. Route `/products/:id` - Trả về thông tin của sản phẩm có id tương ứng.
1. Route `/products` - Với phương thức POST, trả về chuỗi: "Thêm mới sản phẩm"
1. Route `/products/:id`  - Với phương thức PUT, trả về chuỗi: "Chỉnh sửa sản phẩm có ID :id thành công"
1. Route `/products/:id`  - Với phương thức DELETE, trả về chuỗi: "Xóa sản phẩm có ID :id thành công"

## Task 2

Cấu hình thư mục chứa tài nguyên tĩnh cho ứng dụng

Ví dụ: `public/static/images/hinh-anh.jpg`

Sau khi cấu hình xong, chạy server và kiểm tra lại có truy cập được đến tài nguyên tĩnh không

Ví dụ:

```bash
http://localhost:8080/static/images/hinh-anh.jpg
```

Nếu thấy phản hồi lại hình ảnh là ==> OK