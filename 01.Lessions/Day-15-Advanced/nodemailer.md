# Gửi mail trong ứng dụng nodejs

1. Install the Nodemailer library using npm.

```bash
npm install nodemailer
yarn add nodemailer
```

2. Gửi mail

```js
import nodemailer from 'nodemailer';

// Tạo transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@gmail.com',
        pass: 'app_password' //mật khẩu ứng dụng
    }
} as nodemailer.TransportOptions);

// Tạo nội dung email
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'Test email',
    text: 'Hello world!'
};

// Gửi email
transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

```

3. Lấy mật khẩu ứng dụng

- CLick vào biểu tượng avatar email đang đăng nhập --> Manage your google Account 
- Chọn tab Security --> Chọn 2-Step Verification
- Kéo xuống đoạn: App passwords --> Chọn nó
- Điền tên cho ứng dụng --> Create --> nhận được mật khẩu ứng dụng

4. Bật IMAP trong gmail setting lên