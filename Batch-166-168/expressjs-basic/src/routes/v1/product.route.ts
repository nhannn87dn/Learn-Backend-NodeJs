import express from "express"
import productController from '../../controllers/product.controller'
import multer from 'multer'
import path from 'path';
import nodemailer from 'nodemailer';

const router  = express.Router();

function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }

  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {

      const fileInfo = path.parse(file.originalname);
      console.log('fileInfo',fileInfo)
      cb(null, slugify(fileInfo.name )+ '-' + Date.now() + fileInfo.ext);
    }
  })

function fileFilter (req, file, cb) {

    const mimetypeAllow = ["image/png", "image/jpg", "image/gif", "image/jpeg", "image/webp"];
    if (!mimetypeAllow.includes(file.mimetype)) {
        req.fileValidationError = 'Only .png, .gif, .jpg, webp, and .jpeg format allowed!';
        return cb(new Error('Only .png, .gif, .jpg, webp, and .jpeg format allowed!'), false);
    }
    cb(null, true);

}

const singleUpload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 524288  }, //0.5MB 
});

const arrayUpload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 524288  }, //0.5MB 
});
/*
GET - Get all products
localhost:8080/api/v1/products
*/
router.get('', productController.findAll);
/*
GET get one product by ID
localhost:8080/api/v1/products/:id
*/
router.get('/:id', productController.findOne);
/**
 * POST - Create a new product
 * localhost:8080/api/v1/products
 */
router.post('', productController.create);
/*
PUT get one product by ID
localhost:8080/api/v1/products/:id
*/
router.put('/:id', productController.updateById);
/*
DELETE get one product by ID
localhost:8080/api/v1/products/:id
*/
router.delete('/:id', productController.deleteById);

/* TÉT upload */
router.post('/upload/single', singleUpload.single('file'), (req, res, next)=>{
    console.log('single file upload')
    console.log('file',req?.file)

    res.status(200).send({ 
        link: `upload/${req?.file?.filename}`, 
        message: 'File uploaded successfully!' 
    });
})

router.post('/upload/array', arrayUpload.array('photos',2), (req, res, next)=>{
    console.log('array file upload')
    console.log('file',req?.files);

    const links : string[] = [];

    if(req.files){
        req?.files?.forEach(file => {
            links.push(`upload/${file?.filename}`)
        });
    }
   

    res.status(200).send({ 
        links:links, 
        message: 'File uploaded successfully!' 
    });
})


router.post('/upload/multi',  singleUpload.single('thumbnail'), (req, res, next)=>{
    console.log('array file upload')
    console.log('file',req?.files);

    res.status(200).send({ 
        link: `upload/${req?.file?.filename}`,
        body: req.body, 
        message: 'create product successfully!' 
    });
});

router.post('/mail/send', (req, res, next)=>{
   

    // Tạo transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'nhannn@softech.vn',
                pass: 'dsvorwtioopnleec' //mật khẩu ứng dụng
            }
        } as nodemailer.TransportOptions);

        // Tạo nội dung email
        const mailOptions = {
            from: 'nhannn@softech.vn',
            to: 'nhannn87dn@gmail.com',
            subject: 'Test email',
            text: 'Hello world!'
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.log(error);
                res.status(500).send({ 
                    message: 'Email sent failed' 
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({ 
                    message: 'Email sent: ' + info.response 
                });
            }
        });

   
});


export default router