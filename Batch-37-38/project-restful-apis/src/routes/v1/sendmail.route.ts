import express from "express";
const router   = express.Router();
import nodemailer from 'nodemailer'
import globalConfig from '../../constants/config'
// Tạo transporter
const transporter = nodemailer.createTransport({
    host: globalConfig.GMAIL_HOST,
    port: globalConfig.GMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: globalConfig.GMAIL_EMAIL,
        pass: globalConfig.GMAIL_PASS_APP, //mật khẩu ứng dụng
    }
});

//localhost://api/v1/sendmail
router.post('', (req, res, next)=>{
    try {
        // Tạo nội dung email
        const mailOptions = {
            from: 'nhan87dn@gmail.com',
            to: 'nhannn@softech.vn',
            subject: 'Test email node js' + new Date(),
            text: 'Hello world! NodeMailer' //only raw text
        };

            // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    statusCode: 500,
                    message: error.message,
                    typeError: 'MailError'
                })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    statusCode: 200,
                    message: 'Success'
                })
            }
        });
    } catch (error) {
        next(error)
    }
})

router.post('/html', (req, res, next)=>{
    try {
        // Tạo nội dung email
        const mailOptions = {
            from: 'nhan87dn@gmail.com',
            to: 'nhannn@softech.vn',
            subject: 'Test email node js with HTML Format ' + new Date(),
            html: `<b style="color: red">Hello world?</b>`, // html body
        };

            // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    statusCode: 500,
                    message: error.message,
                    typeError: 'MailError'
                })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    statusCode: 200,
                    message: 'Send Mail Success'
                })
            }
        });
    } catch (error) {
        next(error)
    }
})

export default router