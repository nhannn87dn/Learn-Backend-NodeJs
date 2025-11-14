import  express, {Express, NextFunction, Response, Request} from 'express';
import categoriesRoute from './routes/v1/categories.route';
// import categoriesRouteV2 from './routes/v1/categories.route';
// import brandRoute from './routes/v1/brands.route';
import productRoute from './routes/v1/products.route';
// import customerRoute from './routes/v1/customers.route';
// import staffRoute from './routes/v1/staffs.route';
// import authRoute from './routes/v1/auth.route';

import createError, {HttpError } from 'http-errors';
import { ENV } from './config/ENV';
import { sendJsonError } from './helpers/responseHandler';
//import {appExampleMiddleware} from './middleware/appExample.middleware'

const app: Express = express()

/** MIDDLEWARE BEGIN HERE */

/**Cấu hình để nhận request từ Body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Applicaiton middleware example
//app.use(appExampleMiddleware); //su dung middleware

/** MIDDLEWARE END */

/*********** BEGIN DECLARATION ROUTES **************** */
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API'
  })
})

 app.use('/api/v1/categories', categoriesRoute);
// app.use('/api/v2/categories', categoriesRouteV2);
// app.use('/api/v1/brands', brandRoute);
 app.use('/api/v1/products', productRoute);
// app.use('/api/v1/customers', customerRoute);
// app.use('/api/v1/staffs', staffRoute);
// app.use('/api/v1/auth', authRoute);

/************END DECLARATION ROUTES********** */



/*********** BEGIN HANDLE ERRORS **************** */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = ENV.NODE_ENV === 'development' ? err : {};

  // res.status(err.status || 500).json({
  //   message: err.message || "Internal Server Error"
  // });
  sendJsonError({ res, status: { statusCode: err.status || 500, message: err.message || "Internal Server Error" } });
});

/** App chỉ chứa phần cấu hình epxress */
export default app;