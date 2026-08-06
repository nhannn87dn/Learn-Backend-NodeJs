import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import categoriesRouter from "./routes/v1/categories.route"
import categoriesRouterV2 from "./routes/v2/categories.route"
import brandsRouter from "./routes/v1/brands.route"
import productsRouter from "./routes/v1/products.route"
import staffsRouter from "./routes/v1/staffs.route"
import authRouter from "./routes/v1/auth.route"
import createError from 'http-errors';
import { appMiddleware } from './middleware/appMiddleware.middleware';

const app: Express = express();

// Middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware cấp độ ứng dụng (Application-level middleware)
app.use(appMiddleware);

/** BEGIN ROUTES */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//Khai báo route cho categories
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v2/categories', categoriesRouterV2);
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/staffs', staffsRouter);
app.use('/api/v1/auth', authRouter);
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

  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
    statusCode: err.status || 500,
  });
});

export default app;
