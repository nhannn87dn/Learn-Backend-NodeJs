
const http = require('node:https');

//create a server object:
http.createServer(function (req, res) {
    console.log('server running http://localhost:8080');

  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

