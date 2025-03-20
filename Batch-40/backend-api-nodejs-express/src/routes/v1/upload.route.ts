import express from "express";
const router = express.Router();
import multer from 'multer'
import path from "path";
import {buildSlugify } from "../../helpers/slugify.helper";

const storage = multer.diskStorage({
    // vị trí lưu
    destination: function (req, file, cb) {
      cb(null, 'public/upload/images')
    },
    //custom tên file
    filename: function (req, file, cb) {
        const fileInfo = path.parse(file.originalname);
        console.log('<<=== 🚀 fileInfo ===>>',fileInfo);
        cb(null, buildSlugify(fileInfo.name) + '-' + Date.now() + fileInfo.ext)
    }
  })
  
  const upload = multer({ storage: storage })
// localhost:3000/api/v1/upload

router.post('/upload', upload.single('file'), (req, res) => {
    //file nó nằm trong req.file
    console.log(req?.file); // req.file là đối tượng file đã tải lên server

  // Save file to the server (e.g., using Multer)
  res.status(200).send("File uploaded successfully!");
});

export default router;