import express, { Router } from 'express';
import nodemailer from 'nodemailer';

const router = express.Router() as Router;
// Tạo transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'nhannn@softech.vn', // email người gửi
        pass: '' //mật khẩu ứng dụng
    }
} as nodemailer.TransportOptions);

// POST api/v1/sendmail/example ==> send example mail
router.post('/example', (req, res) => {
  // Placeholder logic for sending example mail

  // Tạo nội dung email
    const mailOptions = {
        from: 'nhannn@softech.vn',
        to: 'nhannn87dn@gmail.com',
        subject: 'Test email from nodemailer with HTML content',
        //text: 'Hello world!' // nội dung email dưới dạng text thuần
        html: '<h1>Hello world!</h1><p>This is a test email sent using Nodemailer.</p>' // nội dung email dưới dạng HTML
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send example mail' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Example mail sent successfully' });
        }
    });

  
});

export default router;