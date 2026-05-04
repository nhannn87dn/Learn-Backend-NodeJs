const fs = require("fs");

console.log("Start"); // Bước 1

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File read callback"); // Bước 5 (sau khi file được đọc)
});

setTimeout(() => {
  console.log("Timeout callback"); // Bước 6 (chạy sau 1 giây)
}, 1000);

setImmediate(() => {
  console.log("Immediate callback"); // Bước 4 (ngay sau poll phase)
});

console.log("End"); // Bước 2