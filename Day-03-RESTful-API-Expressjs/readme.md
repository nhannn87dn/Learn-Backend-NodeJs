# Asynchronous programming and API server

Nội dung chính trong bài:

- Callback and Error-First Pattern
- Promises and Async/Await
- Xây dựng cấu trúc RESTFul-APIs
- Middleware trong Express
- Express middleware phổ biến
- Errors Handling App
- Logging Requests
- Chuẩn hóa Response API

=====================

## 💛 Callback and Error-First Pattern

Xem ở đây [Callbacks](2.Async-Await/callback-deep.md)

## 💛 Promises and Async/Await

Xem ở đây [Promises](2.Async-Await/Promises.md)

Xem ở đây [Async/Await](2.Async-Await/async-await.md)

## 💛 Xây dựng cấu trúc RESTFul-APIs

RESTful API là một loại giao diện lập trình ứng dụng (API) được thiết kế theo các nguyên tắc của kiến trúc REST (Representational State Transfer). REST là một kiểu kiến trúc phần mềm dựa trên giao thức HTTP và các tiêu chuẩn web liên quan khác.

RESTful API cho phép các ứng dụng giao tiếp và trao đổi dữ liệu với nhau qua mạng. Nó sử dụng các phương thức HTTP như GET, POST, PUT và DELETE để thực hiện các hoạt động CRUD (Create, Read, Update, Delete) trên dữ liệu.

| Method    | Semantics     |
|-----------|---------------|
| POST      | Create        |
| GET       | Read/Retrieve |
| PUT/PATCH | Update        |
| DELETE    | Delete        |
| --------  | --------      |

Các RESTful API được thiết kế để hoạt động dựa trên nguyên tắc "stateless" (không lưu trạng thái). Điều này có nghĩa là mỗi yêu cầu từ client đến server phải chứa tất cả thông tin cần thiết để server hiểu và xử lý yêu cầu, không phụ thuộc vào bất kỳ trạng thái trước đó nào. Server không lưu trạng thái của client giữa các yêu cầu.

Một RESTful API thường sử dụng các đường dẫn URL để xác định tài nguyên và các phương thức HTTP để xác định hành động trên tài nguyên đó. Các dữ liệu thường được truyền qua các định dạng như JSON hoặc XML.

RESTful API đã trở thành một phương pháp phổ biến để xây dựng các dịch vụ web và ứng dụng di động, vì nó đơn giản, linh hoạt và dễ dùng.

Từng bước xây dựng dự án theo mô hình


### 🔶 1: Cấu trúc dự án

Phát triển dự án theo cấu trúc saum sử dụng TypeScript:

```html
project-restful-apis/
├─ node_modules/
├─ public/
├─ src/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ services/
│  ├─ helpers/
│  ├─ validations/
│  ├─ configs/
│  ├─ routes/
│  │  ├─ v1/
│  │  ├─ v2/
│  ├─ app.ts
├─ .env
├─ server.ts
├─ .gitignore
├─ package.json
├─ README.md

```

Cài đặt xem lại ở bài học trước với TypeScript



**/Controllers** - Thư mục này sẽ chứa tất cả các chức năng dể viết các API của bạn. Cách đặt tên: xxxxx.controller.js trong đó xxx là nhiệm vụ thôi, ví dụ: login.controller.js

**/Routes** - Thư mục này sẽ chứa tất cả các tuyến đường mà bạn đã tạo bằng cách sử dụng Express Router và kết hợp với Controllers. Cách đặt tên cũng như trên xxxxx.routes.js

**/Models** - Thư mục này sẽ chứa tất cả các files như schema của bạn và và các chức năng cần thiết cho schema cũng sẽ nằm ở đây. Đặt tên xxxxx.model.js

**/Middleware** - Thư mục này sẽ chứa tất cả phần mềm trung gian mà bạn đã tạo, ví dụ như là xác thực chẳng hạn... Cách đặt tên: xxxxx.middleware.js /

**Helpers** - Các chức năng phổ biến mà bạn sẽ yêu cầu nhiều lần trong suốt mã của mình ví dụ như check missing params trước khi xử lý dữ liệu chẳng hạn. Rất cần thiết.

**/Configs** - File này dùng cấu hình cho các API / dịch vụ của bên thứ ba như passport / S3, v.v. Những thông số như keyAPI các kiểu.

Đó là những folders rất quan trọng, có thể nói là không thể thiếu. Ngoài ra còn những files trong root như là:

**server.js** - Tập tin khởi chạy ứng dụng Express

**app.js** - Tệp này về cơ bản sẽ là khai báo của ứng dụng Express

**package.json** - File này chứa tất cả các chi tiết npm của dự án, các lệnh chạy như scripts và các phần dependencies

**.gitignore** - Những file mà bạn không muốn đẩy sang git

### 🔶 Follow cách hoạt động của mô hình cấu trúc dự án

![follow](img/flow.png)

### 🔶 Tạo một API đầu tiên

Thông tường trong thực tế một API sẽ có địa chỉ

```html
https://domain.com/api/v1/end-points
```
Dựa vào đó người ta nhận ra ngay được đó là hệ thống RestFul API có phiên bản.

Bây giờ chúng ta tạo một end-point có cấu trúc đường dẫn tương tự trên.


```html
https://localhost:9000/api/v1/users
```

Trả về danh sách người dùng Users


Tại src/routes tạo file users.route.ts

```js
import express, {Request, Response } from 'express';
const router = express.Router();

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];


// Get all users
router.get('/', async (req: Request, res: Response) => {
  res.status(200).json(users);
});

module.exports = router;
```

Gắn router vào app.ts

```js
const usersRouter = require('./routes/users.route');
//API sẽ bắt đầu bằng api/users
app.use('/api/users', usersRouter);
```

## 💛 3 Tổng quan Middleware

### 🌻 3.0 Middleware là gì ?

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

## 🌻 3.1 Cách để tạo ra một middleware theo nhu cầu

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

### 🌻 3.2 Gắn middleware vào Application

Tại express app

```js
const myLogger require('./middlewares/mylogger.middleware');

//Gắn middleware vào app
app.use(myLogger);
```

### 🌻 3.3 Lớp middleware

Tạo thêm 2 ví dụ về middleware nữa để thấy được sự chuyển tiếp giữa các lớp middleware

### 🌻 3.4 Express middleware

Sử dụng các thư viện phổ biến để làm middleware cho src/app.js

Tham khảo: <https://expressjs.com/en/resources/middleware.html>

- compression
- cors
- xss-clean
- helmet
- body-parser
- ...

## 💛 5: Errors Handling App

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

## 💛 6: Logging Requests

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

## 💛 7: Chuẩn hóa định dạng JSON API trả về

Không có bất kỳ quy tắc nào để ràng buộc cách bạn trả về một chuổi JSON có cấu trúc như thế nào cả.

Tuy nhiên dưới đây là một số cách định dạng mà bạn có thể tham khảo:

[JSON API](http://jsonapi.org/) - JSON API covers creating and updating resources as well, not just responses.

[JSend](https://github.com/omniti-labs/jsend) - Simple and probably what you are already doing.

Bạn phải thể hiện được khi có lỗi thì cần trả về gì, khi thành công thì cần trả về cái gì ? Và tất cả các Endpoint API phải có cùng cấu trúc.

Ví dụ: Thành công

```json
{
  "statusCode": "0",
  "message": "Successfully"
}
```

Ví dụ: Thành công có gửi kèm data

```json
{
  "statusCode": "0",
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
  "statusCode": "400",
  "message": "A title is required"
}
```

Ví dụ: Lỗi (khiến code không thể xử lý)

```json
{
  "statusCode": "500",
  "message": "Can not connect to Datatabase"
}
```

Thông thường người ta tạo ra một bảng danh mục mã lỗi kèm message để đối chiếu khi làm một hệ thống lớn.

| Error Code |    Description     |
| :--------: | :----------------: |
|     0      |    Successfull     |
|     1      |      Pending       |
|    201     | Create new success |
|    404     |   API Not Found    |
|    500     |    Error Server    |

Tạo một file `src\utilities\responseHandler.js` để handle việc đó

```js
const sendJsonSuccess = (res, message, code) => {
  return (data, globalData) => {
    code = code || 200;
    res.status(code).json({
      statusCode: code,
      message: message || 'Success',
      data,
      ...globalData,
    });
  };
};

const sendJsonErrors = (req, res, error) => {
  console.log(error);
  return res.status(error.status || 500).json({
    statusCode: error.status || 500,
    message: error.message || 'Unhandled Error',
    error,
  });
};

module.exports = {
  sendJsonSuccess,
  sendJsonErrors,
};
```
