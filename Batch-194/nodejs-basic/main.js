const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;
//Hàm tạo server: createServer
const server = http.createServer((req, res) => {
  //Phản hồi lại client Hello world
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});
//Lắng nghe request ở cổng 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});