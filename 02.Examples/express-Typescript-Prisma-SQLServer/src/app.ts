import express,  {Express, NextFunction, Request, Response} from 'express';
import indexRoute from './routes/index'
const app: Express = express()


//Để nhận định dạng json gửi lên từ client
app.use(express.json()); //Built-in middleware 
app.use(express.urlencoded({ extended: false }));


app.use("/api",indexRoute);



/***
 * Từ đây trở xuống là không được chèn cái gì vào thêm bên dưới
 */
//Handle Errors App
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 404, message: 'Not Found' });
});

// error handler --> tất cả lỗi khác rơi vào đây
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const statusCode = err.status || 500;
  res.status(statusCode).json({ statusCode: statusCode, message: err.message });
});

export default app;