# URL Module

Phân tích các thành phần của URL

```js
var url = require('url');
// Ví dụ có một URL, hoặc có thể tạo server rồi lấy url bằng req.url
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
```

Ví dụ 2:

```js
var http = require('http');
var url = require('url');

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);

    console.log(q);
  })
  .listen(8080);
```
