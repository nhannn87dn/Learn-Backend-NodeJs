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

### 1. Xem Hướng dẫn Deploy NodeJS TypeScript lên Render.com

1. Code mẫu: 02.Examples\express-deployment-example

Lưu ý: có tạo thêm file `build.sh` trong thư mục dự án

```shell
echo "BUILD START"
yarn
yarn build
echo "BUILD END"
```

1. Video hướng dẫn: https://youtu.be/TAKTYbx2GzY


### 2. Xem Hướng dẫn Deploy NodeJS TypeScript lên Vercel

Cụ thể xem Video tại link: https://youtu.be/qvH7sJ_1e4Y


**Bước 1**: Cài đặt Vercel

```bash
npm install --global vercel
```

Cài ở chế độ global toàn cục để tất cả project sau này đều dùng được,

**Bước 2**: Tạo `.gitignore `

Tạo một file .gitignore tại thư mục gốc dự án

Thêm dòng này vào trên đầu

```text
vercel
```

**Bước 3**: Login Vercel

Tại thư mục gốc dự án trong cửa sổ `terminal` bạn nhập lệnh

```bash
vercel login
```

Vercel sẽ liệt kê cho bạn danh sách các phương thức xác thực. Trong đó bạn chọn Login bằng `Github`.

Vercel sinh ra cho bạn một cái link để chuyển hướng đăng nhập.

**Bước 4**: Build Project

Tiếp đó đánh lệnh build project, để biên dịch typescript thành javascript. Kết quả được xuất ra tại thư mục `dist`

```bash
yarn build
```

Cụ thể bạn xem lại script

```json
"scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "start": "node ./dist/server.js"
  },
```

**Bước 5**: Deploy

Để deploy lên vercel, bạn cần tạo ra một file `vercel.json` trong thư mục gốc nhự án như sau:

```js
{
  "version": 2,
  "builds": [
      {
          "src": "dist/server.js",
          "use": "@vercel/node",
          "config": { "includeFiles": ["dist/**"] }
      }
  ],
  "routes": [
      {
          "src": "/(.*)",
          "dest": "dist/server.js"
      }
  ]
}
```

Tiếp theo bạn nhập lệnh

```bash
vercel
```

Vercel sẽ chạy theo trình tự

```bash
? Set up and deploy “D:\Learn-Backend-NodeJs\02.Examples\express-deployment-example”? yes
? Which scope do you want to deploy to? nhan's projects
? Link to existing project? no
? What’s your project’s name? express-deployment-example
? In which directory is your code located? ./
```

Sau đó đợi kết quả. Nếu thành công Vercel sẽ cung cấp cho bạn danh sách các link để truy cập như dưới đây

```bash
Linked to nhans-projects/express-deployment-example (created .vercel and added it to .gitignore)
�  Inspect: https://vercel.com/nhans-projects/express-deployment-example/U2SEjdxwJhWL2shnpHh6E8xyGKi1 [2s]
✅  Production: https://express-deployment-example-qtyi6nla2-nhans-projects.vercel.app [2s]
�  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
�  To change the domain or build command, go to https://vercel.com/nhans-projects/express-deployment-example/settings
```

Tiếp theo bạn giữ phím CTRL , click lên link tại dòng `Inspect`. Link sẽ chuyển hướng đến phần dashboard của project này trên Vercel Admin.

Ở đó bạn có thể tìm thấy Domain chính thức để gọi API.

Domain có cấu trúc: `[tên dự án đã nhập ở bước trên].vercel.app`
Ví dụ: express-deployment-example.vercel.app