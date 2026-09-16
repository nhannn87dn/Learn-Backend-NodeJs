const http = require("http");

const server = http.createServer((req, res) => {
    
    if(req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Welcome to the Home Page");
    }
    else if(req.url === "/products") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify([
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
            { id: 3, name: "Product 3" }
        ]));
    }
});

server.listen(3000);