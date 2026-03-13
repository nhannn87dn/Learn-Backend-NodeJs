import express from 'express';
import type { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { buildSlug } from '../../helpers/buildSlug';

const router: Router = express.Router();

//Cau hinh Upload Provider
const storage = multer.diskStorage({
    //noi luu file sau khi upload
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  //custom ten file sau khi upload
  filename: function (req, file, cb) {
    console.log('<<=== 🚀 file ===>>',file);
    const fileInfo = path.parse(file.originalname);
    console.log('<<=== 🚀 fileInfo ===>>',fileInfo);
    const fileName = buildSlug(fileInfo.name)  + '-' + Math.round(Math.random() * 1E9)
    //Dinh dang ten file
    cb(null, fileName + fileInfo.ext) //avatar-123456789.png
  },
 
})

const upload = multer({ 
    storage: storage,
    //loc tap tin upload
    fileFilter: function (req, file, cb) {
        //allow extension
        const allowedTypes = ['.jpg', '.zip', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }

    },
    //gioi han dung luong
    limits: {
        fileSize: 1024 * 1024 * 1, //1MB
    }
 })

// POST /api/v1/uploads/single
//feild name: phai la avatar
router.post('/single', upload.single('avatar'), (req, res) => {
    // Logic to handle file upload
    res.status(200).json({ 
        message: 'File uploaded successfully', 
        file: req.file 
    });
});

//array
router.post('/array', upload.array('avatars', 5), (req, res) => {
    // Logic to handle file upload
    res.status(200).json({ 
        message: 'Files uploaded successfully', 
        files: req.files 
    });
});


export default router;