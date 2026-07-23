const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.end('Home Page')
    }
  
    if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify([
      { id: 1, name: "Tom" },
      { id: 2, name: "John" },
    ]));
  }
});

server.listen(3000);