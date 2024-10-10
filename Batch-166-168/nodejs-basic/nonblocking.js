const fs = require("fs");

console.log("Start");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data); // Chỉ in ra sau khi file đọc xong (callback).
});

console.log("End");
