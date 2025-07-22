import { NextFunction, Request, Response } from "express";

export const  routeStaffMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = {
        id: '123',
        name: 'John Doe',
        role: 'staff'
    }
    console.log('routeStaffMiddleware đang chạy...');
    next(); // Chuyển tiếp yêu cầu tới hàm xử lý tiếp theo
}
