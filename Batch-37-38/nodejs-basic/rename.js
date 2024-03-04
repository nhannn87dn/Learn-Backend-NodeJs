const fs = require("node:fs");

fs.rename("log.txt", "logs.txt", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});
