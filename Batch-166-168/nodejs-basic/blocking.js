const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("file.txt", "utf8"); // Blocking - Node.js phải chờ file đọc xong.
console.log(data); // Chỉ thực hiện sau khi đọc file xong.

console.log("End");
