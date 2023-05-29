# Tạo web động sử dụng NodeJs - ExpressJs

Trong bài học này chúng ta tìm hiểu: 

> 1. ExpressJs Framework
> 2. Route và HTTP Methods
> 3. Route paths
> 4. Requests and Handling Parameters
> 5. Response methods
> 6. Serving static files
> 7. Template Engine

==============================

## 💛 1. Giới thiệu về ExpressJs

ExpressJS là một framework ứng dụng web có mã nguồn mở và miễn phí được xây dựng trên nền tảng Node.js. ExpressJS được sử dụng để thiết kế và phát triển các ứng dụng web một cách nhanh chóng.

!['express'](img/expressjs.png)

Nói đến framework là nói đến nó có thể vừa đảm nhận vai trò làm client vừa làm server được.

ExpressJS Rất dễ học, chỉ cần bạn biết JavaScript, bạn sẽ không cần phải học một ngôn ngữ mới, giúp cho việc phát triển back-end dễ dàng hơn nhiều.

**Cách cài đặt**


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

Như vậy chỉ vài dòng code đơn giản , bản đã tạo được một server chạy trên môi trường NodeJs

## 💛 2. Route và HTTP Methods

Route là một thành phần cực kỳ quan trọng của một website, nó giúp website biết được người dùng truy cập đến nơi nào của trang web, từ đó phản hồi lại một cách thích hợp.

Cú pháp định nghĩa một Route

```js
app.METHOD(PATH, HANDLER);
```

- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.

Ví dụ:

Phản hồi khi có một truy cập đến trang chủ với phương thức GET

```js
app.get('/', (req, res) => {
  res.send('Hello World!. I\'m a Home Page');
});
```

Phản hồi khi có một truy cập đến trang chủ với phương thức POST

```js
app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

Phản hồi khi có một truy cập đến trang user với phương thức PUT

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});
```

Phản hồi khi có một truy cập đến trang user với phương thức DELETE

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

Đọc thêm: [So sánh GET với POST](https://timoday.edu.vn/cac-phuong-thuc-request-trong-giao-thuc-http/#So_sanh_GET_voi_POST)

## 💛 Route paths

Ngoài cách bạn định nghĩa path một cách cụ thể như ví dụ trên thì bạn có thể tạo ra các `path` với một `string patterns`


route path sẽ khớp với: acd, abcd.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});
```

route path khớp với abcd, abbcd, abbbcd, và nhiều hơn

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});
```

route path khớp với abcd, abxcd, abRANDOMcd, ab123cd, và nhiều hơn

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});
```

route path khớp với /abe and /abcde.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e');
});
```

Hoặc khớp với một biểu thức chính quy `regular expressions`:

route path khớp khi url có chứa ký tự `a`

```js
app.get(/a/, (req, res) => {
  res.send('/a/');
});
```

route path khớp khi url như butterfly, dragonfly, và không khớp khi butterflyman, dragonflyman. $ là đánh dấu là kết thúc.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/');
});
```

Regex rule trong trường hợp sử dụng  route parameter

```js
// Ví dụ: /user/1
app.get('^/users/:userId([0-9]{6})', function (req, res) {
  res.send('Route match for User ID: ' + req.params.userId);
});
```

```js
// Ví dụ: /user/aptech
app.get('^/users/:username([0-9a-zA-Z]{6,12})', function (req, res) {
  res.send('Route match for User Name: ' + req.params.username);
});
```

## 💛 Requests and Handling Parameters

### 🚩 HTTP Request là gì ?

📌 **HTTP** (Hypertext Transfer Protocol) Là một giao thức cơ bản mà World Wide Web sử dụng. HTTP xác định cách mà các thông điệp (như các file văn bản, hình ảnh đồ hoạ, âm thanh, video, và các file multimedia ...) được định dạng và truyền tải ra sao, và những hành động nào mà các Webserver và các trình duyệt web (browser) phải làm để đáp ứng lại

![http](img/HTTP-request-response-model.png)

📌 **HTTP Request** hiểu một cách đơn giản là các thông tin sẽ được gửi từ người dùng (client) lên server. Server sẽ có nhiệm vụ tìm và xử lý các loại dữ liệu, thông tin, client mong muốn

Có nhiều phương thức khác nhau để gửi một request đến server trong đó các phương thức phổ biến: GET,POST,PUT,DELETE,PATCH

### 🚩Cấu trúc của một Request

HTTP Request có cấu tạo gồm ba phần chính. Đó là request line, header và massage body

1. Request Line: Methods, Path (URL), HTTP version

2. Request Header: thông tin mở rộng cho request: cookie, thông tin về ủy quyền, tác nhân người dùng…

3. Request Body: nội dung mà request mang theo để gửi lên server

### 🚩 Truy cập đến body gửi lên từ request

```js
router.post('/', (req, res) => {
  const data = req.body;
  console.log('data:', data);

  // Code here ...

  res.sendStatus(200);
});
```

### Truy cập đến parameter gửi lên từ request

```js
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  console.log('id:', id);

  // Code here ...

  res.sendStatus(200);
});
```

### Truy cập đến query string gửi lên từ request

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

## 💛 HTTP Response

Response có nghĩa là phản hồi. Đây là kết quả server trả về cho client.


HTTP Response có cấu tạo gồm ba phần chính. Đó là status line, header và massage body

1. Request Line: Http Status Code, Reason-Phrase, HTTP version

2. Request Header: thông tin mở rộng cho request: cookie, thông tin về ủy quyền, tác nhân người dùng…

3. Message Body

ExpressJs hỗ trợ các phương thức response như sau:

| Method           | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| res.download()   | Tải file.                                                       |
| res.end()        | Kết thúc xử lý reponse                                                            |
| res.json()       | Gửi một Json                                                                 |
| res.jsonp()      | Send a JSON response with JSONP support.                                              |
| res.redirect()   | Chuyển hướng request                                                                   |
| res.render()     | Render một giao diện                                                               |
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


## 💛 Serving static files in Express

Khi bạn upload images, CSS files, and JavaScript files lên server thì bạn cần public đường dẫn đến các tài nguyên tĩnh này thì mình sẽ khai báo:

```js
//Tại app.js
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
`path.join(__dirname, 'public')` là bạn đang xác định đường dẫn đến thư mục public khi bạn đang đứng ở app.js

Bạn truy cập tới các tài nguyên tĩnh bằng tiền tố `/static`

```code

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Thực tế không tồn tại thư mục /static trên server, thư mục ảo

## 💛 Sử dụng template engines với Express

Chúng ta biết rằng Express là một framework nên nó có thể đảm nhận công việc client side, có thể dùng để làm một ứng dụng, một website bình thường.

Bằng cách sử dụng `template engines` phổ biến làm việc với Express như Pug, Mustache, and EJS.

Xem ví dụ về sử dụng `ejs engines` ở thư mục Examples/express-ejs-template

Tạo một trang web có 5 trang sử dụng ExpressJs

* Trang chủ  với đường dẫn : /
* Trang About với đường dẫn: /about
* Trang Product với đường dẫn: /products
* Trang Blog với đường dẫn: /blog
* Trang Login với đường dẫn: /login

Cài đặt:

```bash
npm install ejs
yarn add ejs
```

Thêm 2 dòng này vào app.js

```js
// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

```

Đọc thêm: Mô hình MVC là gì ?

Tạo các template cho 5 trang nói trên

```code
views/
  ├─ index.html
  ├─ about.html
  ├─ products.html
  ├─ blog.html
  ├─ login.html
app.js
```


Nội dung trang chủ

```js
app.get('/', function (req, res) {
  //render kết quả ra template views/index.html
  res.render('index', {
    title: 'EJS example',
    heading: 'Hello HomePage'
  });
});

```

Tương tự cho các trang còn lại

