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
npm init
```
Tạo biến môi trường

```js
//File .env
NODE_ENV=
PORT= 3001

PUBLIC_URL = 'http://localhost:3001/'

TIMEZONE_CITY = "Asia/Bangkok"
TIMEZONE_OFFSET = "+07:00"

MONGO_URI=
MONGO_COLLECTION = 

REDIS_URL=localhost

JWT_SECURE_KEY = 

NODE_MAIL_HOST = 
NODE_MAIL_PORT = 
NODE_MAIL_SSL = 
NODE_MAIL_USER = 
NODE_MAIL_PASS = 
NODE_MAIL_REPLY = 


#Upload multer
STORAGE_IMAGES_DIR = 'uploads/images/'
# Formart: Number.Unit Ex: 5.KB, 1.MB, 2.GB
MAX_SIZE_IMAGES_BYTES = '2.MB'
STORAGE_FILES_DIR = 'uploads/files/'
# Formart: Number.Unit Ex: 5.KB, 1.MB, 2.GB
MAX_SIZE_FILES_BYTES = '1.GB'


```

Tạo file server.js là entry point dự án

```js
equire('dotenv').config();
const app = require('./src/app')

const {PORT} = process.env;


const server = app.listen( PORT, () => {
    console.log(`WSV start with port ${PORT}`);
})

process.on('SIGINT', () => {
    server.close( () => console.log(`exits server express`))
})
```
