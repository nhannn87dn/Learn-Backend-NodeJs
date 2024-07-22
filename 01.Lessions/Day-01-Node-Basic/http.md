# HTTP Module

Chi tiết xem tại trang chủ Nodejs

- https://nodejs.org/docs/latest/api/http.html


Tạo một Node server to transfer data over the Hyper Text Transfer Protocol (HTTP).

```js

const http = require('node:http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080


```

Xem thêm tại: 

- https://www.w3schools.com/nodejs/nodejs_http.asp
