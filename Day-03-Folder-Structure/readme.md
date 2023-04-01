# Folder structure using Express and Node.Js

Xây dựng cấu trúc dự án RESTFul-APIs với Node.Js và Express CHUẨN đi làm

Tạo một thư mục dự án ví dụ: my-app

Khởi tạo dự án

```bash
npm init
```

## 💛 Xây dựng cấu trúc thư mục

Không có một quy chuẩn nào để tạo ra một cấu trúc dự án chuẩn nhất, dưới đây là 2 mô hình từ Basic tới Master

### Mô hình Basic

```code
my-app/
├─ node_modules/
├─ public/
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

**/Middlewares** - Thư mục này sẽ chứa tất cả phần mềm trung gian mà bạn đã tạo, ví dụ như là xác thực chẳng hạn... Cách đặt tên: xxxxx.middleware.js /

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

### 1: Khởi tạo dự án

```bash
npm init -y
```

- Tạo biến môi trường .env

```bash
NODE_ENV= development
PORT= 8686

MONGO_URI=
MONGO_COLLECTION =

JWT_SECURE_KEY =

```

- Tạo thư mục dự án
- Tạo server Express src/app.js

```bash
npm i express --save
```

```js
const express = require('express');
const app = express();

module.exports = app;
```

- Tạo file server.js là entry point dự án

```bash
npm i dotenv --save
```

```js
require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env || 8686;

const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT}`);
});
```

- Cấu hình lại package.json

```bash
npm i nodemon --dev
```

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
```

Start ứng dụng

```bash
npm run dev
```

### 🔶 2: Tạo Route đầu tiên

- "api/": xem phiên bản API hiện tại
- "api/users": xem danh sách Users

Tại src/routes tạo file index.js

```js
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

//Response version API
router.get('/', async (req, res) => {
  res.status(200).json({ version: '1.0' });
});

// Get all users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

module.exports = router;
```

Gắn router vào app.js

```js
const FirstRouter = require('./routes/index');
//Các API sẽ bắt đầu bằng api
app.use('/api', FirstRouter);

//localhost:8686/api
//localhost:8686/api/users
```

### 🔶 3: Tự Tạo ra một Middleware

#### 🌻 3.0 Middleware là gì ?

Trong lấp trình ứng dụng WEB, Middleware sẽ đóng vai trò trung gian giữa request/response (tương tác với người dùng) và các xử lý logic bên trong web server.

Middleware sẽ là các hàm được dùng để tiền xử lý, lọc các request trước khi đưa vào xử lý logic hoặc điều chỉnh các response trước khi gửi về cho người dùng.

![middleware-partern](img/middleware-partern.png)

Hình trên mô tả 3 middleware có trong ExpressJS. Một request khi gửi đến Express sẽ được xử lý qua 5 bước như sau :

1. Tìm Route tương ứng với request
2. Dùng CORS Middleware để kiểm tra cross-origin Resource sharing của request
3. Dùng CRSF Middleware để xác thực CSRF của request, chống fake request
4. Dùng Auth Middleware để xác thực request có được truy cập hay không
5. Xử lý công việc được yêu cầu bởi request (Main Task)

Bất kỳ bước nào trong các bước 2,3,4 nếu xảy ra lỗi sẽ trả về response thông báo cho người dùng, có thể là lỗi CORS, lỗi CSRF hay lỗi auth tùy thuộc vào request bị dừng ở bước nào.

**Middleware trong ExpressJS** về cơ bản sẽ là một loạt các hàm Middleware được thực hiện liên tiếp nhau. Sau khi đã thiết lập, các request từ phía người dùng khi gửi lên ExpressJS sẽ thực hiện lần lượt qua các hàm Middleware cho đến khi trả về response cho người dùng. Các hàm này sẽ được quyền truy cập đến các đối tượng đại diện cho Request - req, Response - res, hàm Middleware tiếp theo - next, và đối tượng lỗi - err nếu cần thiết.

Một hàm Middleware sau khi hoạt động xong, nếu chưa phải là cuối cùng trong chuỗi các hàm cần thực hiện, sẽ cần gọi lệnh next() để chuyển sang hàm tiếp theo, bằng không xử lý sẽ bị treo tại hàm đó.

Trong Express, có 5 kiểu middleware có thể sử dụng :

- Application-level middleware (middleware cấp ứng dụng)
- Router-level middleware (middlware cấp điều hướng - router)
- Error-handling middleware (middleware xử lý lỗi)
- Built-in middleware (middleware sẵn có)
- Third-party middleware (middleware của bên thứ ba)

#### 🌻 3.1 Cách để tạo ra một middleware theo nhu cầu

Tại thư mục middleware, tạo một file tên: mylogger.middleware.js

```js
//Tạo và export luôn
module.exports = function (req, res, next) {
  //Logic Here
  console.log('LOGGED', req);

  //Có thể gắn Thêm vào request một biến
  req.aptech = { name: 'Softech', add: '38 yen bai' };

  //End with next() -> chuyển tiếp sang middleware khác nếu có
  next();
};
```

#### 🌻 3.2 Gắn middleware vào Application

Tại express app

```js
const myLogger require('./middlewares/mylogger.middleware');

//Gắn middleware vào app
app.use(myLogger);
```

#### 🌻 3.3 Lớp middleware

Tạo thêm 2 ví dụ về middleware nữa để thấy được sự chuyển tiếp giữa các lớp middleware

### 🔶 4: Express middleware

Sử dụng các thư viện phổ biến để làm middleware cho src/app.js

Tham khảo: <https://expressjs.com/en/resources/middleware.html>

- compression
- cors
- xss-clean
- helmet
- body-parser
- ...

### 🔶5: Errors Handling App

- Lỗi 40x
- Lỗi 50x

Sử dụng thư viện:

- http-errors

```bash
npm i http-errors --save
```

Tại App Express import vào

```js
const createError = require('http-errors');
```

Add đoạn này nằm NGAY TRƯỚC phần module.exports = app

```js
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err.message });
});
```

### 🔶 6: Validation Configurations

- Validate các biến môi trường, biến config đúng chuẩn.
- Sử dụng joi, yup

Cần cài thêm

```bash
npm i dotenv joi --save
```

Trong thư mục src/configs tạo file config.js

```js
/* load environment variables from .env file */
const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

/* validate env  */
const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required()
      .default('development'),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description('MongoDB connect URI'),
    MONGO_COLLECTION: Joi.string()
      .required()
      .description('MongoDB Collection Name'),
    JWT_SECURE_KEY: Joi.string().required().description('JWT Secret Key'),
  })
  .unknown();

const { value: envVars, error } = envVarSchema
  .prefs({
    errors: { label: 'key' },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message} `);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: { secure_key: envVars.JWT_SECURE_KEY },
  mongoose: { url: envVars.MONGO_URI, name: envVars.MONGO_COLLECTION },
};
```

Mục đích để người dùng khai báo biến đúng chuẩn, đúng giá trị cần thiết

### 🔶 7: Logging Requests

- Ghi log lại mỗi requests gửi lên server express

Thêm đoạn này vào app.js

```js
// Middleware to log request parameters
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} - headers:`,
    req.headers,
    '- body: ',
    req.body,
    '- query:',
    req.query
  );
  next();
});

// Routes and other middleware setup
```

- morgan / winston

Xem cách sử dụng với morgan: <https://expressjs.com/en/resources/middleware/morgan.html>

```js
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream'); // version 2.x

var app = express();

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
```

### 🔶 8: Chuẩn hóa định dạng JSON API trả về

Không có bất kỳ quy tắc nào để ràng buộc cách bạn trả về một chuổi JSON có cấu trúc như thế nào cả.

Tuy nhiên dưới đây là một số cách định dạng mà bạn có thể tham khảo:

[JSON API](http://jsonapi.org/) - JSON API covers creating and updating resources as well, not just responses.

[JSend](https://github.com/omniti-labs/jsend) - Simple and probably what you are already doing.

Bạn phải thể hiện được khi có lỗi thì cần trả về gì, khi thành công thì cần trả về cái gì ? Và tất cả các Endpoint API phải có cùng cấu trúc.

Ví dụ: Thành công

```json
{
  "status": "0",
  "message": "Successfully"
}
```

Ví dụ: Thành công có gửi kèm data

```json
{
  "status": "0",
  "message": "Successfully",
  "data": {
    "posts": [
      { "id": 1, "title": "A blog post", "body": "Some useful content" },
      { "id": 2, "title": "Another blog post", "body": "More content" }
    ]
  }
}
```

Ví dụ: Thất bại (không có lỗi, chỉ là nó chưa tuân thủ một quy tắc nào đó như là validations)

```json
{
  "status": "400",
  "message": "A title is required"
}
```

Ví dụ: Lỗi (khiến code không thể xử lý)

```json
{
  "status": "500",
  "message": "Can not connect to Datatabase"
}
```

Thông thường người ta tạo ra một bảng danh mục mã lỗi kèm message để đối chiếu khi làm một hệ thống lớn.

| Error Code | Description|
|:------:|:-------:|
| 0 | Successfull |
| 1 | Pending |
| 201 | Create new success |
| 404 | API Not Found |
| 500 | Error Server |