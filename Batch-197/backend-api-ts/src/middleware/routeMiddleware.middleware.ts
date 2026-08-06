import { type Request, type Response, type NextFunction } from 'express';


export const routeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Middleware logic here
  console.log(`2. routeMiddleware`);

  //Bắt buộc đặt ở cuối cùng của middleware để tiếp tục xử lý các middleware tiếp theo
  next();
}