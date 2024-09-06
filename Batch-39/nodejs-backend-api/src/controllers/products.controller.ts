import { Response, Request, NextFunction } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import productsService from '../services/products.service';
import multer from 'multer'
import { buildSlug } from '../helpers/buildSlug';
import path from 'path';



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

const uploadHandle = multer({ 
  storage: storage, 
  fileFilter: imageFilter,
  limits: { fileSize: 2000000  }, //2MB in bytes

}).single('file')


/* get All Product Controller */

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const products = await productsService.findAll(req.query);
    sendJsonSuccess(res)(products)
  } catch (error) {
    next(error)
  }
  
}

const findAllByCategorySlug = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {slug} = req.params;
    const products = await productsService.findAllByCategorySlug(slug);
    sendJsonSuccess(res)(products)
  } catch (error) {
    next(error)
  }
  
}

const findOne = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.findOne(id);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}


const findOneBySlug = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {slug} = req.params;

    const product = await productsService.findOneBySlug(slug);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}


const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
  try {
   
    const product = await productsService.createDocument(req.body)

    //Neu tao sp thanh cong thi moi upload hinh
    if(product){
      uploadHandle(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err);
         
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err);
          
        }
        
       console.log('Upload thanh cong');
        //Cập nhật lại đường dẫn link vào cho sản phẩm
        product.thumbnail = `uploads/${req.file?.filename}`;
        console.log('<<=== 🚀 uploads file ===>>',`uploads/${req.file?.filename}`);
        //luu lai thong tin san pham
        await productsService.updateById(product._id, product);
      
      })
    }

    console.log('<<=== 🚀 product Create ===>>',product);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.updateById(id, req.body);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.deleteById(id);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

export default {
  findAll,
  findOne,
  createDocument,
  updateById,
  deleteById,
  findAllByCategorySlug,
  findOneBySlug
}

