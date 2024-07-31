import express, {Express, NextFunction, Request, Response} from 'express'
import path from 'path';
import createError from 'http-errors';
import {sendJsonErrors} from './helpers/responseHandler'
/* import các routes */
import categoriesRoute from './routes/v1/categories.route'
import brandsRoute from  './routes/v1/brand.route'
//v2
import categoriesRouteV2 from './routes/v2/categories.route'

const app: Express = express()


/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));
/* Khai báo thư mục chứa tài nguyên tĩnh */
app.use(express.static(path.join(__dirname, '../public')))

// BẮT ĐẦU KHAI BÁO ROUTES TỪ ĐÂY
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v2/categories', categoriesRouteV2)
app.use('/api/v1/brands', brandsRoute)


// HANDLER ERRORS
//Phải nằm sau phần khai báo routes


//Lỗi 404, những route ko tồn tại
app.use((req: Request, res: Response, next: NextFunction)=>{
  //Next chuyển tiếp
  next(createError(404))
})

// Báo lỗi ở dạng JSON
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  
  console.log(err.stack)
  
  const statusCode = err.status || 500;
  // res.status(statusCode).json({ 
  //   statusCode: statusCode, 
  //   message: err.message 
  // });
  sendJsonErrors(res, err)
});


export default app

