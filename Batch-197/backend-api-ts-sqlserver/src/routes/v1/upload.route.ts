import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { buildSlug } from '../../helpers/buildSlug.helper';

const router = express.Router();

// 1. Cấu hình danh sách đuôi file & dung lượng tối đa
//Có thể đưa vào .env
const ALLOWED_EXTENSIONS = ['.png', '.zip'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB tính bằng bytes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // vị trí lưu trữ
  },
  filename: function (req, file, cb) {
    // 1. Sửa lỗi mã hóa UTF-8 của Multer (chuyển từ latin1 sang utf8)
    const originalNameDecoded = Buffer.from(file.originalname, 'latin1').toString('utf8');
    //Pare file để lấy thông tin tập tin
    const parsed = path.parse(originalNameDecoded);
    console.log('<<=== 🚀 parsed ===>>',parsed);

    const storageFileName = `${parsed.name}-${Date.now()}`
    // cấu hình tên sau khi upload thành công, tên file vật lý
    cb(null, buildSlug(storageFileName)+`${parsed.ext}`);
  },
});

const upload = multer({ 
    storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE, // Giới hạn kích thước file 2MB
  },
  fileFilter: (req, file, cb) => {
    // Sửa lỗi mã hóa tên file để lấy phần mở rộng chính xác
    const originalNameDecoded = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const ext = path.extname(originalNameDecoded).toLowerCase();

    // Kiểm tra đuôi file có hợp lệ không
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true); // Cho phép upload
    } else {
      cb(new Error(`Chỉ chấp nhận các tập tin định dạng: ${ALLOWED_EXTENSIONS.join(', ')}`));
    }
  },

 });
// POST /api/v1/uploads/profile -without handing error
// router.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any

//   console.log('<<=== 🚀 req.file ===>>',req.file);

//   res.json({
//     message: 'Upload ok'
//   })
// });


// POST /api/v1/uploads/profile - with handing error
router.post('/profile', function (req, res, next) {
  upload.single('avatar')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Lỗi từ phía Multer (ví dụ: Vượt quá 2MB)
      return res.status(400).json({ message: `Lỗi upload: ${err.message}` });
    } else if (err) {
      // Lỗi từ fileFilter (ví dụ: Sai đuôi file)
      return res.status(400).json({ message: err.message });
    }
    
    // Upload thành công
    res.status(200).json({ message: 'Upload thành công!', file: req.file });
  });
});


// POST /api/v1/uploads/photos - with handing error
router.post('/photos', function (req, res, next) {
  upload.array('photos', 12)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Lỗi từ phía Multer (ví dụ: Vượt quá 2MB)
      return res.status(400).json({ message: `Lỗi upload: ${err.message}` });
    } else if (err) {
      // Lỗi từ fileFilter (ví dụ: Sai đuôi file)
      return res.status(400).json({ message: err.message });
    }
    
    // Upload thành công, trả về một mảng files
    res.status(200).json({ message: 'Upload thành công!', files: req.files  });
  });
});

//Tình huống form gửi lên nhiều loại type: text, file
// POST /api/v1/uploads/products - with handing error
router.post('/products', function (req, res, next) {
  upload.single('thumbnail')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Lỗi từ phía Multer (ví dụ: Vượt quá 2MB)
      return res.status(400).json({ message: `Lỗi upload: ${err.message}` });
    } else if (err) {
      // Lỗi từ fileFilter (ví dụ: Sai đuôi file)
      return res.status(400).json({ message: err.message });
    }
    
    
    // Upload thành công, trả về một mảng files
    res.status(200).json({
         message: 'Upload thành công!', 
         file: req.file,
         data: {
            ...req.body,
            thumbnail: `uploads/${req.file?.filename}` // lưu vào db
         }
         });
  });
});



export default router