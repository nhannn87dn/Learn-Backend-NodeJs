const fs = require("node:fs");

fs.unlink("child/del.txt", function (err) {
  if (err) throw err;
  console.log("File deleted!");
});
