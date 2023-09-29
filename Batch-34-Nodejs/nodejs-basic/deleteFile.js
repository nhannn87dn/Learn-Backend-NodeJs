const fs = require('fs');

/**
 * Xóa file
 */
fs.unlink('./deleteFile.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});