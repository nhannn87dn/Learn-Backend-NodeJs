
import express from "express";
import multer from 'multer'
const router   = express.Router();
import buildSlug from "../../helpers/slugHelper";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log('file',file);
        const originName = file.originalname;
        const parts = originName.split(".");
        const fileName = parts[0]; // "logo"
        const fileExtention = parts[1]; // "png"
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null, buildSlug(fileName)  + '-' + uniqueSuffix + '.' + fileExtention)
    }
  })
  
const upload = multer({ storage: storage })
const uploadHandle = upload.single('profile')
//Single Upload file
/**
 * upload.single('avatar')
 * avatar: = tên của input file
 */
router.post('', upload.single('avatar'), (req, res, next)=>{
    console.log(req.file?.filename);
    res.end('upload route')
})
/**
 * upload.array('photos', 12)
 * photos: = tên của input file
 * 12: số lượng tối đa hình cho phép upload
 */
router.post('/multi', upload.array('photos', 12), (req, res, next)=>{
    console.log(req.file?.filename);
    res.end('upload multi files')
})
/**
 * Upload custom Error
 */
router.post('/handle-error', (req, res, next)=>{
    uploadHandle(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
            res.status(500).json({
                statusCode: 500,
                message: err.message,
                typeError: 'MulterError'
            })
        } else if (err) {
          // An unknown error occurred when uploading.
            res.status(500).json({
                statusCode: 500,
                message: err.message,
                typeError: 'UnKnownError'
            })
        }
        console.log(req.file?.filename);
        // Everything went fine.
        res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: {
                link: `upload/${req.file?.filename}`
            }
            //uploads/cloud-1712578218089-387840211.png
        })
    })
})



export default router