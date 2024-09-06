import express from 'express'
import nodemailer from 'nodemailer';

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'ecshopvietnamese@gmail.com',
      pass: 'bhvksgtrvzrsukqk' //mật khẩu ứng dụng
  }
} as nodemailer.TransportOptions);


const router = express.Router();

router.post('/send',  (req, res, next)=>{

    // Tạo nội dung email
    const mailOptions = {
        from: 'ecshopvietnamese@gmail.com',
        to: 'nhannn87dn@gmail.com', //email khach hang
        subject: 'Xac nhan dat hang',
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

    res.json({
        message: 'Sending email successfully!'
    })
})

export default router