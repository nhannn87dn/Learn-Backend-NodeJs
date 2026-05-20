import type { Request, Response, NextFunction } from 'express';

export const testMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //logic xử lý middleware ở đây
    console.log('Test middleware executed');

    //nhận dữ liệu từ res.locals của middleware trước đó
    const user = res.locals.user;
    console.log('User from demoMiddleware:', user);

  //luôn gọi next() để tiếp tục xử lý request
  next();
}