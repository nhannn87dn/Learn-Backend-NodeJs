import { NextFunction, Request, Response } from "express";

export const  appExample = (req: Request, res: Response, next: NextFunction) => {
    console.log('1');
    console.log('Middleware đang chạy...');
    next(); // Chuyển tiếp yêu cầu tới hàm xử lý tiếp theo
}
