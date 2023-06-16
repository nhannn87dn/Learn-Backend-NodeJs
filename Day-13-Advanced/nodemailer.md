# Gửi mail trong ứng dụng nodejs

1. Install the Nodemailer library using npm.

```bash
npm install nodemailer
```

2. Gửi mail

```js
const nodemailer = require('nodemailer');

// Tạo transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

// Tạo nội dung email
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'Test email',
    text: 'Hello world!'
};

// Gửi email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

```