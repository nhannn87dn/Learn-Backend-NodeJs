# Project structure Express and Node.Js

Xây dựng cấu trúc dự án RESTFul-APIs với Node.Js và Express CHUẨN đi làm

Tạo một thư mục dự án ví dụ: my-app

Khởi tạo dự án

```bash
npm init
```

## 💛 Xây dựng cấu trúc thư mục

Không có một quy chuẩn nào để tạo ra một cấu trúc dự án chuẩn nhất, dưới đây là 2 mô hình từ Basic tới Master

### Mô hình Basic (Mới học)

```code
my-app/
├─ node_modules/
├─ src/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ services/
│  ├─ utils/
│  ├─ validations/
│  ├─ configs/
│  ├─ routes/
│  │  ├─ v1/
│  │  ├─ v2/
│  ├─ app.js
├─ .env
├─ server.js
├─ .gitignore
├─ package.json
├─ README.md

```

### Mô hình giúp bạn maintenance, mở rộng nhiều phiển bản APIs

```code
my-app/
├─ node_modules/
├─ src/
│  ├─ v1/
│  ├─ v2/
│  ├─ app.js
├─ .env
├─ server.js
├─ .gitignore
├─ package.json
├─ README.md

```

**/Controllers** - Thư mục này sẽ chứa tất cả các chức năng dể viết các API của bạn. Cách đặt tên: xxxxx.controller.js trong đó xxx là nhiệm vụ thôi, ví dụ: login.controller.js

**/Routes** - Thư mục này sẽ chứa tất cả các tuyến đường mà bạn đã tạo bằng cách sử dụng Express Router và kết hợp với Controllers. Cách đặt tên cũng như trên xxxxx.routes.js

**/Models** - Thư mục này sẽ chứa tất cả các files như schema của bạn và và các chức năng cần thiết cho schema cũng sẽ nằm ở đây. Đặt tên xxxxx.model.js

**/Middleware** - Thư mục này sẽ chứa tất cả phần mềm trung gian mà bạn đã tạo, ví dụ như là xác thực chẳng hạn... Cách đặt tên: xxxxx.middleware.js /

**Utils** - Các chức năng phổ biến mà bạn sẽ yêu cầu nhiều lần trong suốt mã của mình ví dụ như check missing params trước khi xử lý dữ liệu chẳng hạn. Rất cần thiết.

**/Configs** - File này dùng cấu hình cho các API / dịch vụ của bên thứ ba như passport / S3, v.v. Những thông số như keyAPI các kiểu.

Đó là những folders rất quan trọng, có thể nói là không thể thiếu. Ngoài ra còn những files trong root như là:

**server.js** - Tập tin khởi chạy ứng dụng Express

**app.js** - Tệp này về cơ bản sẽ là khai báo của ứng dụng Express

**package.json** - File này chứa tất cả các chi tiết npm của dự án, các lệnh chạy như scripts và các phần dependencies

**.gitignore** - Những file mà bạn không muốn đẩy sang git

## 💛 Follow cách hoạt động của mô hình cấu trúc dự án

Từng bước xây dựng dự án theo mô hình

![flow](img/flow.png)

### Step 1: Khởi tạo dự án

```bash
npm init -y
```

- Tạo biến môi trường
- Tạo thư mục dự án
- Tạo server Express  src/app.js
- Tạo file server.js là entry point dự án
- Cấu hình lại package.json

### Step 2: Tạo Route đầu tiên

- "/": xem phiên bản API hiện tại
- "api/v1/users": xem danh sách Users


### Step 3: Handle Server Express

Sử dụng các thư viện phổ biến để làm middleware cho src/app.js

Tham khảo: <https://expressjs.com/en/resources/middleware.html>

- compression
- cors
- xss-clean
- helmet
- body-parser
- ...

### Step 4: Errors Handling

- Lỗi 40x
- Lỗi 50x


### Step 5: Validation Configurations

- Validate các biến môi trường, biến config đúng chuẩn.

### Step 6: Logging Requests

- Ghi log lại mỗi requests gửi lên server express
- morgan / winston

### Step 7: Tự Tạo ra một Mi1ddleware

- Cách để tạo ra một middleware theo nhu cầu
- Gắn middleware vào Application


## 💛 Làm quen các cộng cụ TEST API

- REST Client (Huachao Mao) Extension
- PostMan: <https://www.postman.com/downloads/>