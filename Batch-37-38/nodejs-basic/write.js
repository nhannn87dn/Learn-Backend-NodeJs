const fs = require("node:fs");
// fs.appendFile("log.txt", "Hello content 2!", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

fs.open("mynewfile2.txt", "w", function (err, file) {
  if (err) throw err;
  console.log("Saved!");
});

fs.writeFile("mynewfile2.txt", "Hello nodejs", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
