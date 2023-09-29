const path = require('path');
//Đường dẫn đầy đủ đến file demo_path.js
const pathFile = '/Users/Refsnes/demo_path.js';

//1. Lấy cho mình tên file tử đường dẫn trên => demo_path.js
const filename = path.basename(pathFile); //Returns the last part of a path
console.log(filename); //==> demo_path.js
//2. Lấy kiểu tập tin (đuôi mở rộng) ==> .js

const extension = path.extname(filename);
console.log(extension); //.js
// if(extension == '.js'){
//     throw new Error('Không cho phép tập tin js')
// }

//3 Lấy thư mục từ đường dẫn
const dir = path.dirname(pathFile);
console.log(dir); ///Users/Refsnes