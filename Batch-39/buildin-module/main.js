const fs = require('node:fs');

//1.Mở file, ở chế w (write)

// fs.open('test.txt', 'w', function (err, file) {
//   if (err) throw err;
//   console.log('Đã mở file test.txt !');
// });

//Đọc
// content = fs.readFileSync('test.txt')

// console.log('content', content);

//2. Ghi nội dung vào dile
// fs.writeFile('test.txt', 'Hello Nodejs!', function (err) {
//   if (err) throw err;
//   console.log('Đã ghi thành công!');
// });

// fs.appendFile('test.txt', "Hoc lap trin", function (err) {
//   if (err) throw err;
//   console.log('Saved!', fs.readFileSync("test.txt", "utf8"));
// });

// fs.unlink('test.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });


fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});