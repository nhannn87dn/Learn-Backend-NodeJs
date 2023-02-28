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

## 💛 Serving static files in Express

## 💛 Using template engines with Express
