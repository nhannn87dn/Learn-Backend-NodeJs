const http = require("node:http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // Xử lý yêu cầu
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello, World!</h1>");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
