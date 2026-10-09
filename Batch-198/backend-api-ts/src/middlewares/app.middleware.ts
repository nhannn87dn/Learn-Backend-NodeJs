import { NextFunction, Request, Response } from "express";

//Cú pháp cơ bản đế tạo một middleware trong Express
export const appMiddlewareExample = (req: Request, res: Response, next: NextFunction) => {
  // Logic xử lý middleware ở đây
  console.log('App middleware example');


  //Cuối cùng phải gọi next() để chuyển sang middleware tiếp theo hoặc route handler
  next();
};