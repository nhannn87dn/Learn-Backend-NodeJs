const fs = require('node:fs');

fs.unlink('output2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});