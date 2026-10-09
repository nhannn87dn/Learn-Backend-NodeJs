import { NextFunction, Request, Response } from "express";

export const routeLevelMiddlewareExample = (req: Request, res: Response, next: NextFunction) => {
  // Logic xử lý middleware ở đây
  console.log('Route level middleware example 1');

  //1.Lấy dữ liệu query từ request
  const { page, limit, sortBy, sortOrder } = req.query;
  //2.Xử lý các dữ liệu lấy được
  console.log({ page, limit, sortBy, sortOrder });
    res.locals.queryParams = { page, limit, sortBy, sortOrder };
//3. Chuyển tiếp request đến middleware tiếp theo hoặc route handler
  next();
};


export const routeLevelMiddlewareExample2 = (req: Request, res: Response, next: NextFunction) => {
  // Logic xử lý middleware ở đây
  console.log('Route level middleware example 2');
 // Nhận dữ liệu từ middleware trước đó thông qua res.locals
  const queryParams = res.locals.queryParams;
  console.log('Query params from previous middleware: ', queryParams);

  next();
};