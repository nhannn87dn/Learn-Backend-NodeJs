# Private Room

Để tạo ra một kênh chat riêng cho mỗi người kết nối, bạn có thể sử dụng khái niệm của Socket.IO về các "room" (phòng) để quản lý các kênh chat độc lập.

Dưới đây là một phiên bản cải tiến của ví dụ trước, trong đó mỗi người kết nối sẽ được gán vào một phòng chat riêng:

```javascript
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Xử lý khi có kết nối từ một client
io.on('connection', (socket) => {
  console.log('New client connected');

  // Khi người dùng tham gia vào phòng chat
  socket.on('join', (room, user) => {
    // Tham gia vào phòng chat
    socket.join(room);

    // Gửi thông báo đến tất cả người dùng trong phòng chat
    io.to(room).emit('userJoined', user);

    // Gửi danh sách người dùng hiện tại trong phòng chat cho người dùng mới
    const usersInRoom = getUsersInRoom(room);
    socket.emit('userList', usersInRoom);

    // Gửi thông báo cho tất cả người dùng trong phòng chat rằng có người mới tham gia
    socket.to(room).emit('userList', usersInRoom.map(user => user.name));
  });

  // Khi người dùng gửi tin nhắn
  socket.on('message', (room, message) => {
    // Tìm người dùng gửi tin nhắn
    const user = getUserBySocketId(socket.id);

    // Gửi tin nhắn đến tất cả người dùng trong phòng chat
    io.to(room).emit('message', { user: user.name, message });
  });

  // Xử lý khi một client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected');

    // Tìm phòng chat mà người dùng đang tham gia
    const room = getRoomBySocketId(socket.id);

    // Nếu người dùng đang tham gia một phòng chat
    if (room) {
      // Rời khỏi phòng chat
      socket.leave(room);

      // Xóa người dùng khỏi danh sách
      const user = removeUser(socket.id);

      if (user) {
        // Gửi thông báo cho tất cả người dùng trong phòng chat rằng người dùng đã rời đi
        io.to(room).emit('userLeft', user.name);
      }
    }
  });
});

// Lưu trữ thông tin người dùng và phòng chat
const users = [];
const rooms = {};

// Lấy danh sách người dùng trong một phòng chat
function getUsersInRoom(room) {
  return users.filter(user => user.room === room);
}

// Lấy thông tin phòng chat mà một người dùng đang tham gia
function getRoomBySocketId(socketId) {
  const user = users.find(user => user.id === socketId);
  return user ? user.room : null;
}

// Lấy thông tin người dùng dựa trên socketId
function getUserBySocketId(socketId) {
  return users.find(user => user.id === socketId);
}

// Xóa người dùng khỏi danh sách
function removeUser(socketId) {
  const index = users.findIndex(user => user.id === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
}

// Serve các file tĩnh trong thư mục public
app.use(express.static('public'));

// Chạy server trên cổng 3000
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

Trong ví dụ này, chúng ta sử dụng một đối tượng `rooms` để lưu trữ thông tin phòng chat. Khi một người dùng kết nối và tham gia một phòng chat, chúng ta sẽ gán người dùng vào phòng tchat tương ứng và thông báo cho tất cả người dùng trong phòng chat đó. Khi một người dùng gửi tin nhắn, chúng ta sẽ gửi tin nhắn đó đến tất cả người dùng trong cùng phòng chat.

Lưu ý rằng trong ví dụ này, chúng ta lưu trữ thông tin người dùng và phòng chat trong bộ nhớ của server. Trong một ứng dụng thực tế, bạn có thể xem xét sử dụng cơ sở dữ liệu để lưu trữ thông tin này.

Để sử dụng ví dụ trên, bạn cần cung cấp giao diện người dùng để người dùng có thể tương tác và tham gia vào các phòng chat khác nhau. Bạn cũng có thể tùy chỉnh giao diện người dùng để hiển thị tin nhắn và các sự kiện liên quan đến người dùng trong phòng chat.