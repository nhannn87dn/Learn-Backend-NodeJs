import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { buildSlug } from '../../utils/buildSlug';


const router = express.Router() as Router;
// const upload = multer({ 
//   dest: 'public/uploads/', //thư mục lưu trữ file upload lên
//  })


const storage = multer.diskStorage({
  //cấu hình thư mục lưu trữ 
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  //cấu hình tên file sau khi upload lên
  filename: function (req, file, cb) {

    console.log('<<=== 🚀 file ===>>',file);
    const fileInfo  = path.parse(file.originalname);
    console.log('<<=== 🚀 fileInfo ===>>',fileInfo);

    cb(null, buildSlug(fileInfo.name) + '-' + Date.now() + fileInfo.ext)
  },
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Giới hạn kích thước file upload tối đa 5MB
  },
  fileFilter: (req, file, cb) => {
    // Chỉ chấp nhận các định dạng file hình ảnh
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/tiff') {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// POST api/v1/upload/avatar ==> upload avatar
router.post('/avatar', upload.single('avatar'), (req, res) => {

  console.log('<<=== 🚀 req.file ===>>',req.file);
  // Placeholder logic for avatar upload
  res.status(200).json({ 
    message: 'Avatar uploaded successfully',
    file: req.file,
    link: `uploads/${req.file?.filename}`
   });
});

router.post('/photos', upload.array('photos', 12), function (req, res, next) {
 
  res.status(200).json({ message: 'Photos uploaded successfully', files: req.files });
})


router.post('/mixed', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), function (req, res, next) {
 
  res.status(200).json({ message: 'Photos uploaded successfully', files: req.files });
})


export default router;