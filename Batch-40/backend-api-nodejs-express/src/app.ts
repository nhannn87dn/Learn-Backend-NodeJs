import express, {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import compression from 'compression';
// Import routes
import categoriesRouter from './routes/v1/categories.route'
import brandsRouter from './routes/v1/brands.route'
import queriesRouter from './routes/v1/queries.route'
import productsRouter from './routes/v1/products.route'
import staffRouter from './routes/v1/staffs.route'
import authRouter from './routes/v1/auth.route'
/** -------|| INITIAL APP || --------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

/** -------|| BEGIN REGISTER ROUTES || --------- */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//Đăng ký một route từ file bên ngoài
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', brandsRouter);
app.use('/api/v1', queriesRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', staffRouter);
app.use('/api/v1/auth', authRouter);
/** -------|| END REGISTER ROUTES || --------- */

// NO EDIT BEGIN HERE
/** -------|| BEGIN HANDLE ERRORS || --------- */
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler, catch 5xx errors
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message,
    data: null
  });
});
/** -------|| END HANDLE ERRORS || --------- */
export default app;