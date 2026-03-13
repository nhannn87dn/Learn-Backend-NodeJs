import express from 'express';
import type { Router } from 'express';
import nodemailer from 'nodemailer';

const router: Router = express.Router();

// Tạo transporter
//TODO: đưa vào file .env
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'nhannn@softech.vn',
        pass: '' //mật khẩu ứng dụng
    }
} as nodemailer.TransportOptions);


// Tạo nội dung email
const mailOptions = {
    from: 'nhannn@softech.vn',
    to: 'nhannn87dn@gmail.com',
    subject: 'Test email lan thu 2',
    //text: 'Hello world!', //gui text thua
    html: '<p><strong>Hello test email</strong></p>',
};

//POST /api/v1/mail/send
router.post('/send', (req, res) => {

    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
        console.log(error);
        res.json({
            message: 'error'
        })
    } else {
        res.json({
            message: 'success'
        })
    }
});
   
});

export default router;