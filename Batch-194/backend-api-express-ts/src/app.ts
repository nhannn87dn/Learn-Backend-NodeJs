import  express, {Express, NextFunction, Response, Request} from 'express';
import categoriesRoute from './routes/v1/categories.route';
import categoriesRouteV2 from './routes/v1/categories.route';
import createError, {HttpError } from 'http-errors';
import { ENV } from './config/ENV';
import Student from './models/Student.model';

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
app.use('/api/v2/categories', categoriesRouteV2);
app.get('/students', async (req: Request, res: Response) => {
  const students = await Student.find();
  res.json({
    message: 'Danh sách sinh viên',
    data: students
  })
});
app.post('/students', async (req: Request, res: Response) => {
  const { fullName, age, code } = req.body;
  const newStudent = new Student({
    fullName,
    age,
    code
  });
  await newStudent.save();
  res.status(201).json({
    message: 'Tạo sinh viên thành công',
    data: newStudent
  })
});

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