import { NextFunction, Request, Response } from "express";

export const  routeStaffMiddleware2 = (req: Request, res: Response, next: NextFunction) => {
    console.log('routeStaffMiddleware 2 đang chạy...');
    console.log('<<=== 🚀 res.locals ===>>',res.locals);
    next(); // Chuyển tiếp yêu cầu tới hàm xử lý tiếp theo
}
