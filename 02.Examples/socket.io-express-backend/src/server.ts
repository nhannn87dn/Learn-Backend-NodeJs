import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Để đơn giản, cho phép tất cả các nguồn. Trong thực tế, nên giới hạn lại.
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Lắng nghe message từ client gửi đến
  socket.on('sendMessage', (message: string) => {
    console.log('Message received: ', message);

     // Phản hồi lại tin nhắn cho client
    if(message == 'hello'){
      io.emit('receiveMessage', `${message} - Xin chào !`);
      //Hoặc thực hiện một logic xử lý gì đó ghi nhận được hello
    }
    else if(message == 'bye'){
      io.emit('receiveMessage', `${message} - Tạm biệt!`);
    }
    else if(message == 'thank'){
      io.emit('receiveMessage', `${message} - Cảm ơn bạn!`);
    }
    else{
      io.emit('receiveMessage', `bạn vừa gửi lên ${message}`);
    }
   
    
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));