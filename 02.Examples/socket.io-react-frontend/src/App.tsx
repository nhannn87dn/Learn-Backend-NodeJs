import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000'); // Kết nối tới server

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Nghe sự kiện nhận tin nhắn
    socket.on('receiveMessage', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', message); // Gửi tin nhắn tới server
    setMessage(''); // Xóa nội dung input sau khi gửi
  };

  return (
    <div>
      <h1>Socket.io React Example</h1>
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault(); // Chặn form submit mặc định để tránh reload trang
          sendMessage();
        }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
        </form>
      </div>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;