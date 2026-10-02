import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import studentsRouter from "./routes/v1/students.route";
import studentsRouterV2 from "./routes/v2/students.route";
import categoriesRouter from "./routes/v1/categoriesroute";

const app: Express = express();


//Parse JSON và URL-encoded data từ request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

/* ==== THÊM CÁC ROUTE HERE ==== */
app.use('/api/v1/students', studentsRouter);
app.use('/api/v2/students', studentsRouterV2);
app.use('/api/v1/categories', categoriesRouter);




app.use((req: Request, res: Response, next) => {
  next(createError(404, 'Not Found'));
});
// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  //debug lỗi trên môi truờng development
  if(process.env.NODE_ENV === 'development') {
    console.error('err.stack: ', err.stack);
  }

  // 1. Ưu tiên lấy status/statusCode truyền vào
  let statusCode = err.status || err.statusCode;

  // 2. Nếu là lỗi do chính Multer bắt (ví dụ: Vượt quá 2MB - LIMIT_FILE_SIZE)
  // if (err instanceof multer.MulterError) {
  //   statusCode = 400;
  // }

  // 3. Fallback về 500 nếu không xác định được status
  statusCode = statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    statusCode: statusCode,
  });
 
});
export default app;