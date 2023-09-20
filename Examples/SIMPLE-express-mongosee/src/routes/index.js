const express = require('express');
const router = express.Router();
const {multer,storageImage} = require('../configs/multerConfig');
const nodemailer = require('nodemailer');


/* Cấu hình upload */
const upload = multer({
  storage: storageImage
}).single('file');


/* cấu hình email */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecshopvietnamese@gmail.com',
    pass: 'bhvksgtrvzrsukqk'
  }
});


//Response version API
router.get('/', async (req, res) => {
  res.status(200).json({ version: '1.0' });
});


router.post('/upload', async (req, res,next) => {
  //Gọi hàm upload
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({ type: 'MulterError', err: err });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({ type: 'UnknownError', err: err });
    }

    // Everything went fine.
    console.log(req.file);
    //check file uploaded successfully
    //save path to database
  })

});

/* 
Ví dụ send mail
*/
router.post('/sendmail', async (req, res,next) => {
  
  const mailOptions = {
    from: 'ecshopvietnamese@gmail.com',
    to: 'nhannn87dn@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };


  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.status(500).json({ type: 'sendMailError', err});
    } else {
      res.status(200).json({ msg: 'Email sent: ' + info.response});
    }
  });


});

module.exports = router;