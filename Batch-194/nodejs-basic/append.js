const fs = require('fs');

const data = '\n Day la dong tiep theo.';
fs.appendFile('expand.txt', data, 'utf8', (err) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi thêm dữ liệu vào file:', err);
  }
  console.log('Dữ liệu đã được thêm vào file.');
});