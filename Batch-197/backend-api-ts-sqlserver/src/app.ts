import express, { type NextFunction, type Express, type Request, type Response } from 'express';
// import categoriesRouter from "./routes/v1/categories.route"
// import categoriesRouterV2 from "./routes/v2/categories.route"
// import brandsRouter from "./routes/v1/brands.route"
// import productsRouter from "./routes/v1/products.route"
// import staffsRouter from "./routes/v1/staffs.route"
// import authRouter from "./routes/v1/auth.route"
// import customersRouter from "./routes/v1/customers.route"
// import ordersRouter from "./routes/v1/orders.route"
// import uploadRouter from "./routes/v1/upload.route"
// import emailRouter from "./routes/v1/mail.route"
import createError from 'http-errors';
import { appMiddleware } from './middleware/appMiddleware.middleware';
import cors from 'cors';
import path from 'node:path';
import multer from 'multer';

const app: Express = express();

// Middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Cấu hình tài nguyên tĩnh
app.use(express.static(path.join(__dirname, '../public')));
//enable cors
app.use(cors());

//Middleware cấp độ ứng dụng (Application-level middleware)
app.use(appMiddleware);

/** BEGIN ROUTES */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//Khai báo route cho categories
// app.use('/api/v1/categories', categoriesRouter);
// app.use('/api/v2/categories', categoriesRouterV2);
// app.use('/api/v1/brands', brandsRouter);
// app.use('/api/v1/products', productsRouter);
// app.use('/api/v1/staffs', staffsRouter);
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/customers', customersRouter);
// app.use('/api/v1/orders', ordersRouter);
// app.use('/api/v1/uploads', uploadRouter);
// app.use('/api/v1/mail', emailRouter);
/** END ROUTES */


/* === KHÔNG SỬA TỪ ĐÂY === */
// Middleware xử lý lỗi 404
app.use((req: Request, res: Response, next) => {
  next(createError(404, 'Not Found'));
});
// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  //debug lỗi trên môi truờng development
  if(process.env.NODE_ENV === 'development') {
    console.error('err.stack: ', err.stack);
  }

  // 1. Ưu tiên lấy status/statusCode truyền vào
  let statusCode = err.status || err.statusCode;

  // 2. Nếu là lỗi do chính Multer bắt (ví dụ: Vượt quá 2MB - LIMIT_FILE_SIZE)
  if (err instanceof multer.MulterError) {
    statusCode = 400;
  }

  // 3. Fallback về 500 nếu không xác định được status
  statusCode = statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    statusCode: statusCode,
  });
 
});

export default app;
