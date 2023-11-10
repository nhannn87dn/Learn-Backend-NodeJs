import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
//Khởi tại socket từ server đang có
const io = new Server(server);

// Serve các file tĩnh trong thư mục public
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("Hello");
});


/* Các sự kiện từ client gửi lên cho SocketIO */
io.on('connection', (socket) => {
  console.log('a user connected');


  //Lắng nghe client ngắt kết nối =  tắt trình duyệt
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //Lắng nghe client gửi nội dung chát lên
  socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      //Bắn ngược lại cho client msg
      io.emit('chat message', msg);

  });

});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});