# Các Thư viện nâng cao



## 💛 Multer - Thư viện hỗ trợ upload

Xem chi tiết: [Multer](uploadMulter.md)

## 💛 NodeMailer - Thư viện gửi mail

Xem chi tiết: [NodeMailer](nodemailer.md)


## 💛 Express middleware

Sử dụng các thư viện phổ biến để làm middleware cho src/app.ts

Tham khảo: <https://expressjs.com/en/resources/middleware.html>

**cors**

```bash
yarn add cors
yarn add -D @types/cors 
```
**body-parser**

```bash
yarn add body-parser
```

```js
import bodyParser from 'body-parser'

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

**helmet**

Helmet là một middleware bảo mật cho ứng dụng web Node.js. Nó cung cấp các cài đặt bảo mật mặc định và hỗ trợ tùy chỉnh để giúp bảo vệ ứng dụng của bạn khỏi các cuộc tấn công phổ biến như Cross-Site Scripting (XSS), injection attacks và nhiều loại tấn công khác.

```bash
yarn add helmet
```

```js
import helmet from "helmet";
app.use(helmet());
```




## 💛 Logging Requests

- Ghi log lại mỗi requests gửi lên server express

Thêm đoạn này vào app.ts

```js
// Middleware to log request parameters
app.use((req: Request, res: Response, next: NextFunction) => {
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

