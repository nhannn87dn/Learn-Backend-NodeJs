const path = require("node:path");
const parse = path.parse("/Users/Refsnes/demo_path.js");
console.log(parse.name, parse.ext);
console.log("ten-khac-dep-hon" + parse.ext);
