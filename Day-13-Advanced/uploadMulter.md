# Upload files với Multer

Xem chi tiết ở đây: <https://expressjs.com/en/resources/middleware/multer.html>

## Tạo một multerHelper.js như sau

```js
//multerHelper.js
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const UPLOAD_DIRECTORY = './public/uploads';

/**
 * Tạo storage engine cho Multer
 * Upload hình ảnh
 */
const storageSettings = multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      const { collectionName } = req.params;
      //Tạo thư mục lưu nếu chưa tồn tại
      const PATH = `${UPLOAD_DIRECTORY}/${collectionName}`;
      // console.log('PATH', PATH);
      if (!fs.existsSync(PATH)) {
        // Create a directory
        fs.mkdirSync(PATH, { recursive: true });
      }
      callback(null, PATH);
    },
    filename: function (req, file, callback) {
      // Xử lý tên file cho chuẩn
      const fileInfo = path.parse(file.originalname);
      const safeFileName = fileInfo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + Date.now() + fileInfo.ext;
      // return
      callback(null, safeFileName);
    },
  });


  
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

/** Bộ lọc files */
const fileFilter  = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|zip|jpeg|doc|docx|png|xls|xlsx|gif|pdf|rar|webp|txt)$/)) {
        req.fileValidationError = 'Only image files ext jpg|zip|jpeg|doc|docx|png|xls|xlsx|gif|pdf|rar|webp|txt are allowed!';
        return cb(new Error('Only image files ext jpg|zip|jpeg|doc|docx|png|xls|xlsx|gif|pdf|rar|webp|txt are allowed!'), false);
    }
    cb(null, true);
};


/**
 *  Upload Images Middleware
 * Content-Type: multipart/form-data
 * <input type="file" name="file" />
 * */
const uploadFile = multer({
  
  storage: storageSettings,
  limits: { fileSize: 104857600  }, //100MB in bytes
  fileFilter: fileFilter,
}).single('file');

/**
 *  Upload Images Middleware
 * Content-Type: multipart/form-data
 * <input type="file" name="files" />
 * */
const uploadFiles = multer({
   
    storage: storageSettings,
    limits: { fileSize: 104857600  }, //100MB in bytes
    fileFilter: fileFilter,
}).array('files', 5);//max 5 files per request


/**
 *  Upload Images Middleware
 * Content-Type: multipart/form-data
 * <input type="file" name="file" />
 * */
const uploadImage = multer({
   
    storage: storageSettings,
    limits: { fileSize: 2000000  }, //2MB in bytes
    fileFilter: imageFilter,
}).single('files');

/**
 *  Upload Images Middleware
 * Content-Type: multipart/form-data
 * <input type="file" name="files" />
 * */
const uploadImages = multer({
  
    storage: storageSettings,
    limits: { fileSize: 100  }, //2MB in bytes
    fileFilter: imageFilter,
}).array('files', 5);//max 5 files per request
  
  

module.exports = {
    uploadFile,
    uploadFiles,
    uploadImage,
    uploadImages
};


```


## Sử dụng multerHelper

```js
const multer = require('multer')
const {
  uploadFile,
  uploadFiles,
  uploadImage,
  uploadImages
} = require('./helpers/multerHelper')




//Upload images với multer middleware
app.post('/api/v1/upload/:collectionName', (req, res, next) => {
  uploadImages(req, res, function (err) {
    //Bắt lỗi
    if (err instanceof multer.MulterError) {
      next(createError(500, err.message, {type: 'MulterError'}));
    } else if (err) {
      next(createError(500, err.message, {type: 'UnknownError'}));
    } 
    else{
        //còn lại là thành công
      const { collectionName } = req.params;
      console.log('files', req.files);
      console.log('collectionName', collectionName);
       
       res.status(200).json({ ok: true });
    }
    
  });
});


```