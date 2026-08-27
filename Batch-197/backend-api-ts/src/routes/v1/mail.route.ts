import express from 'express';
import nodemailer from "nodemailer"
import { ENV } from '../../config/env';

const router = express.Router();


// Tạo transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.MAIL.USER,
        pass: ENV.MAIL.PASS //mật khẩu ứng dụng
    }
} as nodemailer.TransportOptions);

router.post('/send', (req, res)=>{

    // Tạo nội dung email
    const mailOptions = {
        from: ENV.MAIL.FROM,
        to: req.body.to,
        subject: req.body.subject ?? 'Test email',
        text: req.body.subject ?? 'Hello world!'
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
            console.log(error);
            res.json({
                message: 'false',
                body: req.body
            })
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                message: 'ok',
                body: req.body
            })
        }
    });

    
})

export default router