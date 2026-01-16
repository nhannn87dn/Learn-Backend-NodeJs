const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi đọc file:', err);
  }
  console.log('Nội dung của file:', data);
});