import express, {Request, Response, NextFunction} from 'express';
import createError from "http-errors";
import compression from 'compression';
import helmet from 'helmet';
import categoriesRouter from './routes/v1/categories.route';
import brandsRouter from './routes/v1/brands.route'
import productRouter from './routes/v1/products.route';
import userRouter from './routes/v1/users.route';
import authRouter from './routes/v1/auth.route';
import seedRouter from './routes/v1/seed.route';
import { rateLimit } from 'express-rate-limit'
import { env } from './helpers/env.helper';
import cors from 'cors'
import { seedDB } from './services/seed.service';
import { sendJsonSuccess } from './helpers/response.helper';

const app = express();

//bat cors
app.use(cors())

//sử dụng rate limiting để giới hạn số lượng request từ một IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP chỉ được gửi tối đa 100 request trong khoảng thời gian trên
  message: {
    statusCode: 429,
    message: 'Too many requests, please try again later.',
    data: null
  }
}));
// Sử dụng helmet để bảo mật ứng dụng Express
app.use(helmet());
// Sử dụng compression để nén dữ liệu trả về
app.use(compression());
// cấu hình để nhận dữ liệu từ body của request
// express.json() để parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sử dụng x-api-key middleware
//app.use(authApiKey);


app.get('/', async(req, res, next) => {
 try {
        await seedDB();
        sendJsonSuccess(res, null, "FakeAPI is ready !");
     } catch (error) {
         next(error);
     }
});

// Cấu hình route bằng cách sử dụng app.use()
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', brandsRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/seed', seedRouter);

// Handle 404 Not Found
app.use((req, res, next)=>{
  next(createError(404, 'Not Found'));
});
// Handle errors 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  if(env.NODE_ENV === 'development'){
    console.log('<<=== 🚀 err.stack ===>>',err.stack);
  }
  // Set the status code to the error status or 500 if not set
  res.status(err.status || 500);
  res.json({
    statusCode: err.status || 500,
    message: err.message || 'Internal Server Error',
    data: null
  });
});

export default app;
