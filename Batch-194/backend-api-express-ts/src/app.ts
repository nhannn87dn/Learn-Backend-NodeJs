import  express, {Express, NextFunction, Response, Request} from 'express';
import categoriesRoute from './routes/v1/categories.route';
import createError, {HttpError } from 'http-errors';
import { ENV } from './config/ENV';

const app: Express = express()

/**Cấu hình để nhận request từ Body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    message: 'Backend API'
  })
})

/*********** BEGIN DECLARATION ROUTES **************** */
app.use('/api/v1/categories', categoriesRoute);
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

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

/** App chỉ chứa phần cấu hình epxress */
export default app;