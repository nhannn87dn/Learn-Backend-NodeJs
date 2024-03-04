const url = require("node:url");

const adr = "http://localhost:8080/default.htm?year=2017&month=february";
const q = url.parse(adr, true);

console.log(q);
