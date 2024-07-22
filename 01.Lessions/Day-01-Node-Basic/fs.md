# Node.js File System Module

Module này dùng để thao tác với file:

- Read files
- Create files
- Update files
- Delete files
- Rename files

> Tìm hiểu thêm 
> - https://nodejs.org/docs/latest/api/fs.html
> - https://www.w3schools.com/nodejs/nodejs_filesystem.asp


## Mở file - fs.open()

Hàm `fs.open` trong Node.js là một hàm trong module `fs` (File System), được sử dụng để mở một file. Khi bạn mở một file bằng `fs.open`, bạn có thể thực hiện các thao tác đọc, ghi, hay thực hiện các thao tác khác trên file đó.

### Cú Pháp

```javascript
fs.open(path, flags[, mode], callback)
```

- **path**: Đường dẫn đến file cần mở.
- **flags**: Chế độ mở file (xem chi tiết bên dưới).
- **mode** (tùy chọn): Quyền truy cập file (mặc định là `0o666`).
- **callback**: Hàm callback nhận các đối số `(err, fd)`:
  - `err`: Đối tượng lỗi (nếu có lỗi xảy ra).
  - `fd`: File descriptor, một số nguyên đại diện cho file đã mở.

### Các Chế Độ Mở File (Flags)

Một số flags phổ biến bao gồm:
- `'r'`: Mở file để đọc. Nếu file không tồn tại, sẽ báo lỗi.
- `'r+'`: Mở file để đọc và ghi. Nếu file không tồn tại, sẽ báo lỗi.
- `'w'`: Mở file để ghi. Nếu file không tồn tại, sẽ được tạo mới. Nếu file tồn tại, nội dung sẽ bị ghi đè.
- `'w+'`: Mở file để đọc và ghi. Nếu file không tồn tại, sẽ được tạo mới. Nếu file tồn tại, nội dung sẽ bị ghi đè.
- `'a'`: Mở file để thêm nội dung (append). Nếu file không tồn tại, sẽ được tạo mới.
- `'a+'`: Mở file để đọc và thêm nội dung. Nếu file không tồn tại, sẽ được tạo mới.


### Ví Dụ 1: Mở File Để Đọc

```javascript
const fs = require('fs');

fs.open('example.txt', 'r', (err, fd) => {
  if (err) {
    return console.error('Có lỗi xảy ra:', err);
  }
  console.log('File đã được mở thành công với file descriptor:', fd);

  // Đóng file sau khi hoàn thành thao tác
  fs.close(fd, (err) => {
    if (err) {
      console.error('Lỗi khi đóng file:', err);
    }
    console.log('File đã được đóng lại.');
  });
});
```


## Ghi nội dung vào File

Sát với thực tiển. Khi muốn ghi cái gì lại trong một cuốn sổ thì bạn phải mở cuốn sổ ra trước tiên.

Logic trong lập trình cũng vậy,

```javascript
const fs = require('fs');

// Mở file
fs.open('output.txt', 'w', (err, fd) => {
  if (err) {
    return console.error('Có lỗi xảy ra:', err);
  }
  console.log('File đã được mở thành công với file descriptor:', fd);

  // Ghi dữ liệu vào file
  const buffer = Buffer.from('Hello, world!');
  //Ghi xuống
  fs.write(fd, buffer, 0, buffer.length, null, (err) => {
    if (err) {
      return console.error('Lỗi khi ghi vào file:', err);
    }
    console.log('Dữ liệu đã được ghi vào file.');

    // Đóng file sau khi hoàn thành thao tác
    fs.close(fd, (err) => {
      if (err) {
        console.error('Lỗi khi đóng file:', err);
      }
      console.log('File đã được đóng lại.');
    });
  });
});
```



## Đọc nội dung từ file



Ví dụ có có một file `example.txt`

```txt
Hello NodeJs
```

và một file main.js

```js
const fs = require('fs');

fs.open('example.txt', 'r', (err, fd) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi mở file:', err);
  }
  console.log('File đã được mở thành công.');

  const buffer = Buffer.alloc(1024); // Tạo một buffer để chứa dữ liệu đọc được
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
    if (err) {
      return console.error('Có lỗi xảy ra khi đọc file:', err);
    }
    console.log(`Đã đọc được ${bytesRead} byte từ file.`);
    
    // Chuyển đổi buffer thành chuỗi và in ra nội dung đã đọc
    const content = buffer.slice(0, bytesRead).toString();
    console.log('Nội dung của file:', content);

    // Đóng file sau khi hoàn thành thao tác
    fs.close(fd, (err) => {
      if (err) {
        console.error('Lỗi khi đóng file:', err);
      }
      console.log('File đã được đóng lại.');
    });
  });
});
```


Trong Node.js, các hàm `readFile`, `writeFile`, và `appendFile` thuộc module `fs` cung cấp các phương thức tiện lợi để thao tác với file mà không cần phải mở hoặc đóng file một cách thủ công. Chúng được thiết kế để đơn giản hóa các thao tác đọc, ghi và thêm nội dung vào file, giúp giảm thiểu mã nguồn cần thiết và tránh các lỗi liên quan đến việc quản lý file descriptor.

##  `fs.readFile`

Hàm `fs.readFile` được sử dụng để đọc toàn bộ nội dung của một file. Nó tự động mở, đọc và đóng file, rồi trả về nội dung file trong callback.

### Cú Pháp

```javascript
fs.readFile(path, [options], callback)
```

- **path**: Đường dẫn đến file cần đọc.
- **options** (tùy chọn): Các tùy chọn như encoding và flag.
- **callback**: Hàm callback nhận các đối số `(err, data)`:
  - `err`: Đối tượng lỗi (nếu có lỗi xảy ra).
  - `data`: Nội dung của file.

### Ví Dụ

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi đọc file:', err);
  }
  console.log('Nội dung của file:', data);
});
```

##  `fs.writeFile`

Hàm `fs.writeFile` được sử dụng để ghi nội dung vào một file. Nếu file không tồn tại, nó sẽ được tạo mới. Nếu file tồn tại, nội dung sẽ bị ghi đè.

### Cú Pháp

```javascript
fs.writeFile(file, data, [options], callback)
```

- **file**: Đường dẫn đến file cần ghi.
- **data**: Dữ liệu cần ghi vào file.
- **options** (tùy chọn): Các tùy chọn như encoding, mode và flag.
- **callback**: Hàm callback nhận đối số `err`:
  - `err`: Đối tượng lỗi (nếu có lỗi xảy ra).

### Ví Dụ

```javascript
const fs = require('fs');

const data = 'Hello, world!';
fs.writeFile('output.txt', data, 'utf8', (err) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi ghi file:', err);
  }
  console.log('Dữ liệu đã được ghi vào file.');
});
```

##  `fs.appendFile`

Hàm `fs.appendFile` được sử dụng để thêm nội dung vào cuối file. Nếu file không tồn tại, nó sẽ được tạo mới.

### Cú Pháp

```javascript
fs.appendFile(file, data, [options], callback)
```

- **file**: Đường dẫn đến file cần thêm nội dung.
- **data**: Dữ liệu cần thêm vào file.
- **options** (tùy chọn): Các tùy chọn như encoding, mode và flag.
- **callback**: Hàm callback nhận đối số `err`:
  - `err`: Đối tượng lỗi (nếu có lỗi xảy ra).

### Ví Dụ

```javascript
const fs = require('fs');

const data = '\nThis is additional data.';
fs.appendFile('output.txt', data, 'utf8', (err) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi thêm dữ liệu vào file:', err);
  }
  console.log('Dữ liệu đã được thêm vào file.');
});
```


## Delete Files

Xóa file mynewfile2.txt sử dụng `fs.unlink()`

```js
const fs = require('node:fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
```

## Rename Files

Rename "mynewfile1.txt" to "myrenamedfile.txt":

```js
const fs = require('node:fs');

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});
```
