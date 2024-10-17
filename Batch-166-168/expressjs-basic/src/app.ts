import { sendJsonError, ERROR } from "./helpers/responseHandler";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import createError from "http-errors";
import categoryRoute from "./routes/v1/category.route";
import categoryRouteV2 from "./routes/v2/category.route";

const app = express();

/* bắt được body string từ request */
// app.use(express.urlencoded());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Trang chu
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//==== DINH NGHIA ROUTES ==== //
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v2/categories", categoryRouteV2);

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
    data: null,
  });
  //sendJsonError(res, ERROR.SERVER_ERROR);
});

export default app;
