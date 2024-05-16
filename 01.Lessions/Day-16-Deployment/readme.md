# Deployment

## 💛 Bước chuẩn bị

- Chạy lệnh 

```bash
yarn build
npm run build
```
Để build thử ở local và đảm bảo là không có lỗi gì xảy ra mới commit lên git.

- Đẩy code lên nhánh main

## 💛 Deploy Database

1. Tạo tài khoản MongoDB Atlas, sau đó Tạo một Cluster

Link tại: https://account.mongodb.com/account/login

1. Lấy Connection String dán vào phần kết nối với Mongoose

Xem Video hướng dẫn: https://youtu.be/_ZwfMtZpnzY

## 💛 Deploy App

Cách để deploy ứng dụng NodeJS lên một số dịch vụ miễn phí có hỗ trợ

- https://mdbgo.com
- https://console.qovery.com/login
- https://render.com
- https://www.netlify.com

### Xem Hướng dẫn Deploy NodeJS TypeScript lên Render.com

1. Code mẫu: 02.Examples\express-deployment-example

Lưu ý: có tạo thêm file `build.sh` trong thư mục dự án

1. Video hướng dẫn: https://youtu.be/TAKTYbx2GzY


### Xem Hướng dẫn Deploy NodeJS TypeScript lên Vercel

Đang cập nhật