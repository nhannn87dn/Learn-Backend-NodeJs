const path = require('node:path');
const filename = path.basename('/Users/Refsnes/demo_path.js');
const ext = path.extname(filename)
console.log(filename,ext);

const file = path.parse(filename)

console.log('<<=== 🚀 file ===>>',file);

//"Xin chào các bạn .png" //-- xin-chao-cac-ban.png --> slug