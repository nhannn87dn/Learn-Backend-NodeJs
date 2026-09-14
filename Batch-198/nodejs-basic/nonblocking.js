const fs = require("fs");

console.log("Start");

//callback function
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log('7',data); // Chỉ in ra sau khi file đọc xong (callback).
});

console.log("End");