const fs = require('node:fs');

//check file exists or not
fs.access('mynewfile2.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.error('File does not exist');
    return;
  }
  // If file exists, delete it
  fs.unlink('mynewfile2.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
});