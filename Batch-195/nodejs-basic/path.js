const path = require('path');

// Get filename from a path
const filename = path.basename('/users/docs/file.txt');
console.log(filename);
///users/docs/file1.txt =--> DB file

const extension = path.extname('file.txt');
console.log(extension);

const infos = path.parse('/users/docs/file.txt');
console.log(infos);