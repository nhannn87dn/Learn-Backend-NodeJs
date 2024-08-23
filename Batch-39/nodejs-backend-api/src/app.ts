import express, {Express, NextFunction, Request, Response} from 'express'
import path from 'path';
import createError from 'http-errors';
import {sendJsonErrors} from './helpers/responseHandler'
/* import các routes */
import categoriesRoute from './routes/v1/categories.route'
import brandsRoute from  './routes/v1/brand.route'
import productRoute from './routes/v1/product.route'
import staffRoute from './routes/v1/staff.route'
import authRoute from './routes/v1/auth.route'
//v2
import categoriesRouteV2 from './routes/v2/categories.route'

import {logsMiddleware} from './middlewares/logs.middleware'
import compression  from 'compression'
import cors from 'cors'
const app: Express = express()

app.use(cors())

//# định nghĩa 1 middleware
function myMiddleware(req: Request, res:Response, next: NextFunction){
  // bắt đầu từ đây là logic xử lý request (đầu vào)
  console.log('Middleware 1');

  console.log('req.user.name',req.user.name);
  //Kết thúc
  next(); //Chuyển tiếp sang middleware khác nếu có
}

// compress all responses
app.use(compression())

/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));
/* Khai báo thư mục chứa tài nguyên tĩnh */
app.use(express.static(path.join(__dirname, '../public')))

// CUSTOM MIDDLEWARE
app.use(logsMiddleware  as express.RequestHandler)

//Dùng middleware cho app
app.use(myMiddleware)


// BẮT ĐẦU KHAI BÁO ROUTES TỪ ĐÂY
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v2/categories', categoriesRouteV2)
app.use('/api/v1/brands', brandsRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/staffs', staffRoute)
app.use('/api/v1/auth', authRoute)
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
  res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message,
    data: null 
  });
  //sendJsonErrors(res, err)
});


export default app

