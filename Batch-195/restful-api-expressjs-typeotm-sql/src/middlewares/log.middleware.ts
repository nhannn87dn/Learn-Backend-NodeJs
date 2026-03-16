import { Request, Response, NextFunction } from 'express';
export const logMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    //Logic xử lý
    console.log('M.1');
    const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    }

    res.locals.user = user; //gán dữ liệu vào res.locals để có thể sử dụng ở các middleware tiếp theo hoặc controller

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    //next luôn nằm cuối cùng của middleware, 
    //nó sẽ gọi middleware tiếp theo trong chuỗi, nếu không có middleware nào nữa thì sẽ trả về response cho client
    next();
}