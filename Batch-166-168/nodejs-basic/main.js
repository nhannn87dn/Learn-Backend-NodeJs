const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;
//Hàm tạo server: createServer
const server = http.createServer((req, res) => {
  // Xử lý yêu cầu
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello, World!</h1>");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1s>About Page</h1s>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});
//Lắng nghe request ở cổng 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
