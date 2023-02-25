# Node.js File System Module

Module này dùng để thao tác với file:

- Read files
- Create files
- Update files
- Delete files
- Rename files

> Tìm hiểu thêm https://www.w3schools.com/nodejs/nodejs_filesystem.asp

Cách sử dụng

```js
const fs = require('fs');
```

## Read Files

`fs.readFile()` phương thức này dùng để đọc nội dung file

Ví dụ có có một file demofile1.html

```html
<html>
  <body>
    <h1>My Header</h1>
    <p>My paragraph.</p>
  </body>
</html>
```

và một file main.js

```js
var http = require('http');
var fs = require('fs');
http
  .createServer(function (req, res) {
    fs.readFile('demofile1.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
```

Đọc nội dung file và đưa vào biến data, xuất ra màn hình

## Create Files

The File System module has methods for creating new files:

- fs.appendFile(): Nối thêm nội dung vào cuối file, nếu file tồn tại thì tạo mới
- fs.open(): Mở file
- fs.writeFile(): Ghi file
