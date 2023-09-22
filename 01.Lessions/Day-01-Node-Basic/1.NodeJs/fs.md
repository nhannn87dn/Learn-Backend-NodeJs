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

File System module có một số phương thưc tạo mới file như sau:

- fs.appendFile(): Nối thêm nội dung vào cuối file, nếu file tồn tại thì tạo mới
- fs.open(): Mở file
- fs.writeFile(): Ghi file

Ex1: Sử dụng `appendFile()`:

```js
const fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

Ex2: Dùng `fs.open()` , sử dụng tham số thứ hai `w` để ghi, nếu file không tồn tại thì nó tạo file trống mới.

```js
const fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
```

Ex3: Dùng `fs.writeFile()` nó sẽ thay thế nội dung file đã tồn tại, nếu không nó tạo file mới và ghi nội dung vào file đó.

```js
const fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

## Update Files

Sử dụng 2 phương thức

- fs.appendFile()
- fs.writeFile()

Ex1: Nối thêm `This is my tex` vào cuối file mynewfile1.txt

```js
const fs = require('fs');

fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
```

Ex2: fs.writeFile() thay thế nội dung của file (ghi đè)

```js
const fs = require('fs');

fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});
```

## Delete Files

Xóa file mynewfile2.txt sử dụng `fs.unlink()`

```js
const fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
```

## Rename Files

Rename "mynewfile1.txt" to "myrenamedfile.txt":

```js
const fs = require('fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
```
