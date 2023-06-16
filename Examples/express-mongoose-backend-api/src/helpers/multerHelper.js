const multer = require('multer')
const fs = require('fs');
const path = require('path');
const {UPLOAD_DIRECTORY} = '../constants/configs.js';
const buildSlug = require('../helpers/buildSlug');

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
      const safeFileName = buildSlug(fileInfo.name) + Date.now() + fileInfo.ext;
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
    limits: { fileSize: 2000000  }, //2MB in bytes
    fileFilter: imageFilter,
}).array('files', 5);//max 5 files per request
  
  

module.exports = {
    storageSettings,
    fileFilter, 
    imageFilter,
    uploadFile,
    uploadFiles,
    uploadImage,
    uploadImages
};
