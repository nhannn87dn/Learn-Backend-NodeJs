// const fs = require('fs');

// fs.open('file.txt', 'r', (err, fd) => {
//   if (err) {
//     return console.error('Có lỗi xảy ra:', err);
//   }
//   console.log('File đã được mở thành công với file descriptor:', fd);

//   // Đóng file sau khi hoàn thành thao tác
//   fs.close(fd, (err) => {
//     if (err) {
//       console.error('Lỗi khi đóng file:', err);
//     }
//     console.log('File đã được đóng lại.');
//   });
// });


const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi đọc file:', err);
  }
  console.log('Nội dung của file:', data);
});