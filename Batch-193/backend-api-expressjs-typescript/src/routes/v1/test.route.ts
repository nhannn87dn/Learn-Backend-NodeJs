import express from "express";
import nodemailer from 'nodemailer';
const router = express.Router();


// Tạo transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    //TODO: move to .env
    auth: {
        user: 'nhannn@softech.vn',
        pass: 'rgqidffhescioqvj' //mật khẩu ứng dụng
    }
} as nodemailer.TransportOptions);

// Tạo nội dung email
const mailOptions = {
    from: 'nhannn@softech.vn',
    to: 'nhannn87dn@gmail.com',
    subject: 'Test email ' + Date.now(),
    //text: 'Hello world!',
    html: '<b>Hello world!</b>'
};

// Test route
router.get("/test", async (req, res) => {

 
  res.json({ message: "Test create token!" });
});


router.post("/send-mail", async (req, res) => {

  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
        console.log(error);
        res.json({ message: "Test send mail failed!" });
    } else {
        res.json({ message: "Test send mail success!" });
    }
});

 
});


export default router;
