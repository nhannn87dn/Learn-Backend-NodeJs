import express, {Request, Response, NextFunction} from 'express';
import categoriesRouter from './routes/v1/categories.route';
import categoriesRouterV2 from './routes/v2/categories.route';
import createError from "http-errors";

const app = express();

// cấu hình để nhận dữ liệu từ body của request
// express.json() để parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, World! This is a TypeScript Express API.',
  })
});

// Cấu hình route bằng cách sử dụng app.use()
app.use('/api/v1', categoriesRouter);
app.use('/api/v2', categoriesRouterV2);

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
  });
});

export default app;
