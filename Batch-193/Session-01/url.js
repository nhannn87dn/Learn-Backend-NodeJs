var http = require('node:http');
var url = require('node:url');

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);

    console.log('q.query.page',q.query.page);
    res.end()
  })
  .listen(8080);