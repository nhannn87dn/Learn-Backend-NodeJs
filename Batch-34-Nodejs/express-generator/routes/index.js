var express = require('express');
var router = express.Router();
const multer  = require('multer')
var slugify = require('slugify');
const path = require('path');
const nodemailer = require('nodemailer');
/**
 *  Cấu hình tùy chỉnh 
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {

    //lấy thông tin file vừa up lên
    const fileInfo = path.parse(file.originalname);

    console.log('<<=== 🚀 fileInfo ===>>',fileInfo);

   
    cb(null, slugify(fileInfo.name,{
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
      locale: 'vi',
  }) + '-' +  Date.now() + fileInfo.ext)
  }
})


/** Bộ lọc hình ảnh */
const imageFilter  = function(req, file, cb) {
  // Accept images only
  const mimetypeAllow = ["image/png", "image/jpg", "image/gif", "image/jpeg", "image/webp"];
  if (!mimetypeAllow.includes(file.mimetype)) {
      req.fileValidationError = 'Only .png, .gif, .jpg, webp, and .jpeg format allowed!';
      return cb(new Error('Only .png, .gif, .jpg, webp, and .jpeg format allowed!'), false);
  }
  cb(null, true);
};

const uploadMulti = multer({
   storage: storage,
   fileFilter: imageFilter,
   limits: { fileSize: 10  }, //2MB in bytes
  })
  .array('photos',2);

  const uploadSingle = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 2000000  }, //2MB in bytes
   })
   .single('photo');

//Biến này mô phỏng lấy ra từ database
const products = [
  {id: 1, name: "iPhone 14", price: 300},
  {id: 2, name: "iPhone 15", price: 500},
  {id: 3, name: "iPhone 15 Pro Max", price: 700}
]

//Cấu hình gửi mail
// Tạo transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'nhannn87dn@gmail.com',
      pass: 'mqrnmnhqksmyyrvd' //mật khẩu ứng dụng
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

//Hiển thị danh sách all sản phẩm
router.get('/products', function(req, res, next) {
 
  /**
   * @param1 string, 'product' thì nó lấy file views/product.html để render
   * @param2 json, truyền data từ server đến client
   */
  res.render('category', { title: 'product', products });
});

//HIển thị chi tiết 1 sp dựa vào slug
router.get('/products/:id', function(req, res, next) {
  const {id} =  req.params;

  const product = products.find(product => product.id === parseInt(id))
  /**
   * @param1 string, 'product' thì nó lấy file views/product.html để render
   * @param2 json, truyền data từ server đến client
   */
  res.render('product', { title: 'product', id, product });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

/* Up load 1 hình */
router.post('/photo', function (req, res, next) {
  console.log('photos',req.file);

  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('Lỗi',err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('Lỗi ko ro nguyen nhan',err);
    }
  
    res.send('UP load thanh cong');
  })

  res.send('form');
})

/* Up load nhiều hình */
router.post('/photos', function (req, res, next) {
  
  uploadMulti(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('Lỗi',err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('Lỗi ko ro nguyen nhan',err);
    }
  
    res.send('UP load thanh cong');
  })

})

router.post('/send-email',function(req,res, next){

  // Tạo nội dung email
  const mailOptions = {
    from: 'nhannn87dn@gmail.com',
    to: 'nhannn@softech.vn',
    subject: 'Thong bao email tu Lab 9',
    //text: 'Hello world!', //gửi email với text thuần
    html: '<h2>Đây là nội dung email bằng html</h2>'
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });

  res.send('send-email');
});



module.exports = router;
