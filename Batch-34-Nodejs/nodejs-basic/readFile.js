var http = require('http');
var fs = require('fs');

//Tạo một server ở cổng 8080
http.createServer(function (req, res) {
    ///Tạo server thành công thì
    //Đọc file readFile()
    //fs.readFile(path[, options], callback)
    fs.readFile('./index.html', function (err, data) {
        //Gửi tới response trình duyệt
      res.writeHead(200, { 'Content-Type': 'text/html' });
      //data là kết quả đọc được từ file index.html
      res.write(data);
      //Trả lại trình duyệt cho người xem
      return res.end();
    });


})
.listen(8080);