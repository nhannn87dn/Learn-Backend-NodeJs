const fs = require('fs');
//Cách 1
/**
 * appendFile()
 * Tạo mới nếu chưa tồn tại
 * Nếu tồn tại rồi thì nối thêm nội dung vào cuối cùng của file đó
 * @path = './createFile.txt'
 * @content nội dung bạn muốn ghi vào file
 * @callback hàm trả về kết quả xử lý
 */
// fs.appendFile('./createFile.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

//Cách thứ 2:
//Bước 1: Mở file ra
//Nếu chưa tồn tại file thì nó tạo ra một file rỗng
fs.open('./createFile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
});
//Bước 2: writeFile dùng được khi file đã tồn tại, 
//và ghi đè lại nội dung đã có
fs.writeFile('./createFile2.txt', 'Học NodeJS tại Aptech', function (err) {
    if (err) throw err;
    console.log('Saved!');
});
