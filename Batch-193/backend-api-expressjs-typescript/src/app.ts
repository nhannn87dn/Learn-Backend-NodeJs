import express, {Request, Response, NextFunction} from 'express';
import createError from "http-errors";
import compression from 'compression';
import helmet from 'helmet';
import categoriesRouter from './routes/v1/categories.route';
import categoriesRouterV2 from './routes/v2/categories.route';
import brandsRouter from './routes/v1/brands.route'
import testRouter from './routes/v1/test.route';
import productRouter from './routes/v1/products.route';
import staffRouter from './routes/v1/staffs.route';
import authRouter from './routes/v1/auth.route';
import customerRouter from './routes/v1/customer.route';
import orderRouter from './routes/v1/order.route';
import { authApiKey } from './midlewares/authApiKey.midleware'
import { rateLimit } from 'express-rate-limit'
import cors from "cors"
import path from 'path';
const app = express();

//Cau hinh cors
//cho phép tất cả domain gọi lên
//app.use(cors());
//add learn-backend-node-js.vercel.app to cors
app.use(cors({
  origin: ['http://localhost:5173', 'https://learn-backend-node-js.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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


//Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, World! This is a TypeScript Express API.',
  })
});

// Cấu hình route bằng cách sử dụng app.use()
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', brandsRouter);
app.use('/api/v2', categoriesRouterV2);
app.use('/api/v1', testRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1/staffs', staffRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/orders', orderRouter);

// Handle 404 Not Found
app.use((req, res, next)=>{
  next(createError(404, 'Not Found'));
});
// Handle errors 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('<<=== 🚀 err.stack ===>>',err.stack);
  // Set the status code to the error status or 500 if not set
  res.status(err.status || 500);
  res.json({
    statusCode: err.status || 500,
    message: err.message || 'Internal Server Error',
    data: null
  });
});

export default app;
