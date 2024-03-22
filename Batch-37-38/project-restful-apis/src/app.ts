
import express, { Express, Request, Response, NextFunction } from 'express';
import createError  from 'http-errors';
const app: Express = express();
import { sendJsonErrors } from './helpers/responseHandler';
import cors from 'cors'
//Import cac Routes
import routeCategories from './routes/v1/categories.route';
import routeBrands from './routes/v2/brands.route'
import routeProduct from './routes/v1/products.route'
import routeDemo from './routes/v1/demo.route'
import routerAuth from './routes/v1/auth.route';
import routerStaff from './routes/v1/staffs.route';
import routeCustomer from './routes/v1/customers.route';
import routerOrder from './routes/v1/orders.route';
import { logs } from './middlewares/logs.middleware';
import { second } from './middlewares/second.middleware';
//Để bắt được kiểu JSON từ client gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: '*' })); //Cho phép gọi bất kỳ đâu
// app.use(logs)
// app.use(second)


// Định nghiax các routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

//Cau hinh route cho App
//http://localhost:8080/api/v1/categories
app.use('/api/v1/categories', routeCategories);
app.use('/api/v1/brands', routeBrands);
app.use('/api/v1/products', routeProduct);
app.use('/api/v1/demo', routeDemo);
app.use('/api/v1/auth', routerAuth);
app.use('/api/v1/staffs', routerStaff);
app.use('/api/v1/customers', routeCustomer);
app.use('/api/v1/orders', routerOrder);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const statusCode = err.status || 500;
  // res.status(statusCode).json({ 
  //   statusCode: statusCode, 
  //   message: err.message 
  // });
  sendJsonErrors(req,res,err)
});
export default app;