import express from 'express'
import multer from 'multer'
import { buildSlug } from '../../helpers/buildSlug';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    //Vi tri luu
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    // Custom ten file sau khi upload va luu vao server
    filename: function (req, file, cb) {
       
      // Generate a unique filename to prevent overwriting existing files
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      const fileInfo = path.parse(file.originalname);
      console.log('fileInfo',fileInfo)

      cb(null, buildSlug(fileInfo.name+uniqueSuffix+fileInfo.ext))
      //iPhone BÃ¡n Táº£ GÃ³p674736545647564756437.jpg
    }
    
  })

  /** Bộ lọc hình ảnh */
    const imageFilter  = function(req, file, cb) {
        // Mot mang cac dinh dang tap tin cho phep duoc tai len
        const mimetypeAllow = ["image/png", "image/jpg", "image/gif", "image/jpeg", "image/webp"];
        if (!mimetypeAllow.includes(file.mimetype)) {
            req.fileValidationError = 'Only .png, .gif, .jpg, webp, and .jpeg format allowed!';
            return cb(new Error('Only .png, .gif, .jpg, webp, and .jpeg format allowed!'), false);
        }
        cb(null, true);
    };
  
  const upload = multer({ storage: storage })
  const uploadHandle = multer({ 
    storage: storage, 
    fileFilter: imageFilter,
    limits: { fileSize: 2000000  }, //2MB in bytes

}).single('file')

  const uploadArrayHandle = multer({ storage: storage }).array('photos',5)

router.post('/single', upload.single('file'), (req, res, next)=>{

    res.json({
        message: 'Single post created',
    })
})

// Cos handle loi response
router.post('/single-handle', (req, res, next)=>{

    uploadHandle(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err);
          res.status(500).json({
            statusCode: 500,
            message: err.message,
            typeError: 'MulterError'
        })
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err);
          res.status(500).json({
            statusCode: 500,
            message: err.message,
            typeError: 'UnKnownError'
        })
        }
    
        // Everything went fine.
        res.status(200).json({
          statusCode: 200,
          message: 'success',
          data: {
              link: `uploads/${req.file?.filename}`,
              payload: req.body
          }
      });
      })
})



// Cos handle loi response
router.post('/array-handle', (req, res, next)=>{

    uploadArrayHandle(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err);
           res.status(400).send('Error occurred while uploading the file.');
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err);
           res.status(400).send('Error occurred while uploading the file.');
        }
    
        // Everything went fine.
        res.status(200).json({
            message: 'Single post created',
            filename: req.files
        })
      })
})

export default router