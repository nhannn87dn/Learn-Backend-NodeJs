# Socket.io

Doc: https://socket.io/docs/v4/

## 💛 Giới thiệu về Socket.io

Socket.io là một thư viện JavaScript được sử dụng để tạo kết nối giữa client và server thông qua các websocket hoặc các công nghệ truyền tải dữ liệu khác như SSE (Server-Sent Events). Socket.io được phát triển bởi Guillermo Rauch, và được phát hành lần đầu vào năm 2010.

Socket.io hỗ trợ các trình duyệt web hiện đại và các phiên bản trình duyệt cũ hơn sử dụng các kỹ thuật khác nhau để truyền tải dữ liệu. Socket.io cung cấp một API đơn giản để truyền tải dữ liệu giữa client và server.

Một trong những ưu điểm của Socket.io là tính năng fallback - tức là nếu websocket không được hỗ trợ trên trình duyệt của người dùng, Socket.io sẽ tự động chuyển sang sử dụng các công nghệ truyền tải dữ liệu khác như long polling.

---

## 💛 Các khái niệm cơ bản của Socket.io

### Socket

Socket trong Socket.io là một đối tượng biểu diễn kết nối giữa client và server. Khi client kết nối đến server, server sẽ tạo ra một socket để duy trì kết nối với client này.

###  Server

Server trong Socket.io là một đối tượng chịu trách nhiệm quản lý các kết nối giữa client và server. Server sẽ lắng nghe các kết nối đến từ client và tạo ra các socket tương ứng để duy trì kết nối với client.

Chi tiết: https://socket.io/docs/v4/server-installation/

### Client

Client trong Socket.io là một đối tượng biểu diễn trình duyệt web hoặc ứng dụng di động. Client sẽ kết nối đến server để truyền tải dữ liệu.

Chi tiết: https://socket.io/docs/v4/client-installation/


### Room

Room trong Socket.io là một cơ chế để nhóm các socket vào cùng một phòng. Mỗi socket có thể tham gia vào nhiều phòng khác nhau, và các phòng có thể được sử dụng để gửi dữ liệu cho một nhóm socket cụ thể.

Chi tiết: https://socket.io/docs/v4/rooms/

### Event

Event trong Socket.io là các thông điệp được gửi từ client đến server hoặc từ server đến client. Các event có thể được định nghĩa bởi người dùng và sử dụng để truyền tải dữ liệu giữa các client và server.

Chi tiết: https://socket.io/docs/v4/emitting-events/

---

## 💛 Cách sử dụng Socket.io

Dưới đây là một ví dụ về cách áp dụng Socket.IO trong một ứng dụng thực tế sử dụng Node.js và Express để tạo một ứng dụng chat đơn giản, cho phép các người dùng gửi tin nhắn tới nhau trong thời gian thực.

Đầu tiên, bạn cần cài đặt các module cần thiết. Mở terminal và chạy các lệnh sau:

```
yarn init -y
yarn add express socket.io
```

Sau đó, tạo một file mới có tên `server.js` và thêm mã sau vào đó:

```javascript
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
  console.log('Server started on port 3000');
});
```

Tiếp theo, tạo một thư mục `public` trong cùng thư mục với file `server.js`. Trong thư mục `public`, tạo một file HTML có tên `index.html` và thêm mã sau vào đó:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Real-time Chat</title>
  <style>
    #message-list {
      height: 200px;
      overflow-y: scroll;
    }
  </style>
</head>
<body>
  <h1>Real-time Chat</h1>

  <div>
    <label for="username">Username:</label>
    <input type="text" id="username">
    <button onclick="joinChat()">Join Chat</button>
  </div>

  <div id="chat-container" style="display: none;">
    <div id="user-list"></div>
    <div id="message-list"></div>
    <div>
      <input type="text" id="message">
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();

    function joinChat() {
      const username = document.getElementById('username').value;
      if (username.trim() !== '') {
        document.getElementById('username').disabled = true;
        document.getElementById('chat-container').style.display = 'block';

        socket.emit('join', username);
      }
    }

    function sendMessage() {
      const message = document.getElementById('message').value;
      if (message.trim() !=='') {
        document.getElementById('message').value = '';
        const messageItem = document.createElement('div');
        messageItem.textContent = message;
        document.getElementById('message-list').appendChild(messageItem);

        socket.emit('message', message);
      }
    }

    socket.on('userJoined', (user) => {
      const userItem = document.createElement('div');
      userItem.textContent = `${user} joined the chat`;
      document.getElementById('user-list').appendChild(userItem);
    });

    socket.on('userList', (users) => {
      const userList = document.getElementById('user-list');
      userList.innerHTML = '';
      users.forEach((user) => {
        const userItem = document.createElement('div');
        userItem.textContent = user;
        userList.appendChild(userItem);
      });
    });

    socket.on('message', (data) => {
      const messageItem = document.createElement('div');
      messageItem.textContent = `${data.user}: ${data.message}`;
      document.getElementById('message-list').appendChild(messageItem);
    });

    socket.on('userLeft', (user) => {
      const userItem = document.createElement('div');
      userItem.textContent = `${user} left the chat`;
      document.getElementById('user-list').appendChild(userItem);
    });
  </script>
</body>
</html>
```

Cuối cùng, mở terminal và chạy lệnh sau để khởi động server:

```
node server.js
```

Giờ đây, bạn có thể mở trình duyệt và truy cập vào http://localhost:3000 để sử dụng ứng dụng chat thời gian thực. Nhập tên người dùng và nhấn "Join Chat" để tham gia vào phòng chat. Bạn có thể gửi tin nhắn và xem tin nhắn của các người dùng khác trong cùng phòng chat.

## Sự kiện



Socket.IO cung cấp một số sự kiện có sẵn mà bạn có thể sử dụng trong ứng dụng của mình. Dưới đây là một số sự kiện quan trọng mà Socket.IO hỗ trợ:

1. `connection`: Sự kiện này xảy ra khi một client kết nối thành công với server.
2. `disconnect`: Sự kiện này xảy ra khi một client ngắt kết nối với server.
3. `error`: Sự kiện này xảy ra khi xảy ra lỗi trong quá trình kết nối hoặc truyền dữ liệu.
4. `message`: Sự kiện này được sử dụng để gửi và nhận các tin nhắn giữa server và client.
5. `join`: Sự kiện này được sử dụng để xử lý khi một client tham gia vào một phòng chat cụ thể.
6. `leave`: Sự kiện này được sử dụng để xử lý khi một client rời khỏi một phòng chat.

Ngoài ra, Socket.IO cũng hỗ trợ các sự kiện như `connect`, `disconnecting`, `reconnect`, `reconnect_attempt`, `reconnect_failed` và nhiều sự kiện khác liên quan đến việc kết nối và tái kết nối.

Bạn có thể sử dụng các sự kiện này để xử lý các tương tác giữa server và client trong ứng dụng của mình.

Chi tiết: https://socket.io/docs/v4/emitting-events

