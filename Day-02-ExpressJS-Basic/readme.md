# Tạo web động sử dụng NodeJs - ExpressJs

Cài đặt

```bash
npm install express --save
```

Tại thư mục dự án tạo một file app.js với nội dung sau

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## 💛 Routing Basic

Cú pháp định nghĩa một Route

```js
app.METHOD(PATH, HANDLER);
```

- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.

Examples

```js
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

Respond to POST request on the root route (/), the application’s home page:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

Respond to a PUT request to the /user route:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});
```

Respond to a DELETE request to the /user route:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

## 💛 Route paths

Here are some examples of route paths based on string patterns.

This route path will match acd and abcd.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});
```

This route path will match abcd, abbcd, abbbcd, and so on.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});
```

This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});
```

This route path will match /abe and /abcde.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e');
});
```

Examples of route paths based on regular expressions:

This route path will match anything with an “a” in it.

```js
app.get(/a/, (req, res) => {
  res.send('/a/');
});
```

This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/');
});
```

Regex rule for route parameter

```js
app.get('^/users/:userId([0-9]{6})', function (req, res) {
  res.send('Route match for User ID: ' + req.params.userId);
});
```

```js
app.get('^/users/:username([0-9a-zA-Z]{6,12})', function (req, res) {
  res.send('Route match for User Name: ' + req.params.username);
});
```

## 💛 Requests and Handling Parameters

### To get body of request

```js
router.post('/', (req, res) => {
  const data = req.body;
  console.log('data:', data);

  // Code here ...

  res.sendStatus(200);
});
```

### To get params of request

```js
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  console.log('id:', id);

  // Code here ...

  res.sendStatus(200);
});
```

### To get query string of request

```js
router.get('/search/query', (req, res) => {
  const { query } = req;
  console.log('query:', query);

  // Code here ...

  res.sendStatus(200);
});
```

query example:

```code
http://localhost:9000/customers/search/query?name=peter&age=30
```

## 💛 Response methods

The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

| Method           | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| res.download()   | Prompt a file to be downloaded.                                                       |
| res.end()        | End the response process.                                                             |
| res.json()       | Send a JSON response.                                                                 |
| res.jsonp()      | Send a JSON response with JSONP support.                                              |
| res.redirect()   | Redirect a request.                                                                   |
| res.render()     | Render a view template.                                                               |
| res.send()       | Send a response of various types.                                                     |
| res.sendFile()   | Send a file as an octet stream.                                                       |
| res.sendStatus() | Set the response status code and send its string representation as the response body. |

## 💛 Tìm hiểu về HTTP Status Code

Khi nhận và phiên dịch một HTTP Request, Server sẽ gửi tín hiệu phản hồi là một HTTP Response, trong đó có một thành phần là Status code.

Status code (Mã hóa trạng thái thường được gọi là mã trạng thái) là một số nguyên 3 ký tự, trong đó ký tự đầu tiên của Status-Code định nghĩa loại Response và hai ký tự cuối không có bất cứ vai trò phân loại nào. Có 5 giá trị của ký tự đầu tiên:

- 1xx: Information (Thông tin): Khi nhận được những mã như vậy tức là request đã được server tiếp nhận và quá trình xử lý request đang được tiếp tục.
- 2xx: Success (Thành công): Khi nhận được những mã như vậy tức là request đã được server tiếp nhận, hiểu và xử lý thành công
- 3xx: Redirection (Chuyển hướng): Mã trạng thái này cho biết client cần có thêm action để hoàn thành request
- 4xx: Client Error (Lỗi Client): Nó nghĩa là request chứa cú pháp không chính xác hoặc không được thực hiện.
- 5xx: Server Error (Lỗi Server): Nó nghĩa là Server thất bại với việc thực hiện một request nhìn như có vẻ khả thi

Xem chi tiết [link sau](http-status-code.md)

## 💛 Làm quen các cộng cụ TEST API

- REST Client (Huachao Mao) Extension
- PostMan: <https://www.postman.com/downloads/>

## 💛 Serving static files in Express

Khi bạn upload images, CSS files, and JavaScript files lên server thì bạn cần public đường dẫn đến các tài nguyên tĩnh này thì mình sẽ khai báo:

```js
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

Cấu trúc thư mực

```code
public/
  ├─ css/
  ├─ files/
  ├─ images/
  ├─ uploads/
  ├─ js/
  app.js/
```

Khi đó bạn có thể truy cập đến các tài nguyên tĩnh

```code
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

Ngoài ra bạn có thể tạo ra một tiền tố đường dẫn ảo

```js
app.use('/static', express.static(path.join(__dirname, 'public')));
```

Bạn truy cập tới các tài nguyên tĩnh bằng tiền tố `/static`

```code

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Thực tế không tồn tại thư mục /static trên server

## 💛 Using template engines with Express

Một số template engines phổ biến làm việc với Express như Pug, Mustache, and EJS.

Xem ví dụ về sử dụng ejs engines ở thư mục Examples/express-ejs-template
