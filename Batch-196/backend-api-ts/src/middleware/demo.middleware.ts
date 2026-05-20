import type { Request, Response, NextFunction } from 'express';

export const demoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //logic xử lý middleware ở đây
    console.log('Demo middleware executed');

    //gắn vào res.locals
    res.locals.user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    };

  //luôn gọi next() để tiếp tục xử lý request
  next();
}