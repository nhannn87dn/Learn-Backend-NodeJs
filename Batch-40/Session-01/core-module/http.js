
const http = require('node:http');

//create a server object:
http.createServer(function (req, res) {
  console.log('a',a);
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

