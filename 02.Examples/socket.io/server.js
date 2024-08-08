const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Lưu trữ danh sách người dùng đang kết nối
const users = [];

// Xử lý khi có kết nối từ một client
io.on('connection', (socket) => {
  console.log('New client connected');

  // Khi người dùng tham gia vào phòng chat
  socket.on('join', (user) => {
    // Lưu thông tin người dùng vào danh sách
    users.push({ id: socket.id, name: user });

    // Gửi thông báo đến tất cả người dùng khác
    socket.broadcast.emit('userJoined', user);

    // Gửi danh sách người dùng hiện tại cho người dùng mới
    socket.emit('userList', users.map(user => user.name));
  });

  // Khi người dùng gửi tin nhắn
  socket.on('message', (message) => {
    // Tìm người dùng gửi tin nhắn
    const user = users.find(user => user.id === socket.id);

    // Gửi tin nhắn đến tất cả người dùng khác
    socket.broadcast.emit('message', { user: user.name, message });
  });

  // Xử lý khi một client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected');

    // Xóa người dùng khỏi danh sách
    const index = users.findIndex(user => user.id === socket.id);
    if (index !== -1) {
      const user = users[index];
      users.splice(index, 1);

      // Gửi thông báo đến tất cả người dùng khác
      socket.broadcast.emit('userLeft', user.name);
    }
  });
});

// Serve các file tĩnh trong thư mục public
app.use(express.static('public'));

// Chạy server trên cổng 3000
server.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');
});