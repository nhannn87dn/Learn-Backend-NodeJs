import { Router } from 'express';
import productController from '../../controllers/product.controller';
import { authenticateToken } from '../../midlewares/auth.middleware';

//import multer vào
import multer from "multer";
import path from 'path';
import { buildSlug, buildSlugify } from '../../utils/buildSlug.util';
// Khởi tạo multer với cấu hình lưu trữ
const storage = multer.diskStorage({

    //cấu hình vị trí lưu file
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  //handle tên file sau khi upload lên
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    //custom file name
    const pathInfo = path.parse(file.originalname);

    console.log('<<=== 🚀 pathInfo ===>>', pathInfo);

    cb(null, buildSlugify(pathInfo.name) + '-' + uniqueSuffix + pathInfo.ext)
    //bi.png-1234567890
    //bi-1234567890.png
  }
})

const upload = multer({ storage: storage })


const router = Router();

/** PUBLIC ROUTES */
// GET /api/v1/products/home/:catId?limit=5
router.get('/products/home/:catId', productController.findHomeProducts);
// GET /api/v1/products/category/:slug
router.get('/products/category/:slug', productController.getProductsByCategorySlug);

/** PRIVATE ROUTES */
router.get('/products', authenticateToken, productController.findAll);
router.get('/products/:id', authenticateToken, productController.findById);

// POST /api/v1/products
router.post('/products', authenticateToken, upload.single('file'), productController.create);

// PUT /api/v1/products/:id
router.put('/products/:id', authenticateToken, productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/products/:id', authenticateToken, productController.deleteById);

router.post('/products/upload-single', upload.single('file'), productController.uploadSingle);

export default router;
