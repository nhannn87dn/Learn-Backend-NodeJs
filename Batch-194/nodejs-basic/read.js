const fs = require('node:fs');

fs.readFile('./sub/file.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi đọc file:', err);
  }
  console.log('Nội dung của file:', data);
});

console.log('Đọc file bất đồng bộ đã được khởi động.');