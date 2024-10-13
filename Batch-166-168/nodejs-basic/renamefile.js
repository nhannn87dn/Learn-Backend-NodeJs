const fs = require("node:fs");

fs.rename("child/child.txt", "child/new_name.txt", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});
