const path = require('node:path');
const fs = require('node:fs');
//basename ?
// returns the last portion of a path
// const filename = path.basename('/Users/Refsnes/demo_path.js');
// console.log(filename);
// // extract file info ==> path.parse
// const fileInfo = path.parse('./sub/file.txt');
// console.log('<<=== 🚀 fileInfo ===>>',fileInfo);
// // rename file --> file-timestemp.txt
// const newFileName = `${fileInfo.name}-${Date.now()}${fileInfo.ext}`;
// console.log('<<=== 🚀 newFileName ===>>',newFileName);

// fs.rename('./sub/file.txt', `./sub/${newFileName}`, (err) => {
//   if (err) throw err;
//   console.log('File Renamed!');
// });

//join
const fullPath = path.join('/sub','/folder','file.txt');
console.log('<<=== 🚀 fullPath ===>>',fullPath);