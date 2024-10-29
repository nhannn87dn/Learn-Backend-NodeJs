import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import createError from "http-errors";
import categoryRoute from "./routes/v1/category.route";
import categoryRouteV2 from "./routes/v2/category.route";
import productRoute from './routes/v1/product.route';
import brandRoute from './routes/v1/brand.route';
import staffRoute from './routes/v1/staff.route'
import authRoute from './routes/v1/auth.route';
import { TCustomRequest } from "./types/express";

const app = express();

/* bắt được body string từ request */
// app.use(express.urlencoded());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


/* Middleware function */

function myMiddleware(req: TCustomRequest, res: Response, next: NextFunction) {
  console.log('Middleware đang chạy...');
  req.user = { id: 1, name: 'John Doe' };
  //response về local, nó chỉ tồn trên server backend, chứ nó ko gửi về client
  res.locals.user = { id: 1, name: 'John Doe' };
  next(); // Chuyển tiếp yêu cầu tới hàm xử lý tiếp theo
}
//Su dung middleware
//app.use(myMiddleware);

// Trang chu
app.get("/", (req, res) => {
  console.log('home page');
  res.send("Hello World!");
});

//==== DINH NGHIA ROUTES ==== //
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v2/categories", categoryRouteV2);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/staffs", staffRoute);
app.use("/api/v1/auth", authRoute);
//=== HANDLE ERRORS BEGIN HERE ====//
// Lưu ý: Đặt trước phần export, và sau các route khác

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message,
    data: err.data || null,
  });
});

export default app;
