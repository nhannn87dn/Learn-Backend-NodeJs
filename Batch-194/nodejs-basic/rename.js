const fs = require('node:fs');

fs.rename('tên rất xấu.txt', 'ten-rat-xau.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});