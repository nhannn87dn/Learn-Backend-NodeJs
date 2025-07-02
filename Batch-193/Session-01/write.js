const fs = require('fs');

const data = 'Hello, 222';
fs.writeFile('output.txt', data, 'utf8', (err) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi ghi file:', err);
  }
  console.log('Dữ liệu đã được ghi vào file.');
});