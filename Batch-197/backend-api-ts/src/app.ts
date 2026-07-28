import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import categoriesRouter from "./routes/v1/categories.route"
import categoriesRouterV2 from "./routes/v2/categories.route"
import brandsRouter from "./routes/v1/brands.route"
import createError from 'http-errors';

const app: Express = express();

// Middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/** BEGIN ROUTES */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//Khai báo route cho categories
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v2/categories', categoriesRouterV2);
app.use('/api/v1/brands', brandsRouter);
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
    message: err.message,
    statusCode: err.status || 500,
  });
});

export default app;
