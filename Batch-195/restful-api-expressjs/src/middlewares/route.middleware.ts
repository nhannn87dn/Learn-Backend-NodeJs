import { Request, Response, NextFunction } from 'express';
export const routeMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    //Logic xử lý
    console.log('M.2');
    console.log(`router level`);

    //Đóng dữ liệu từ middleware trước đó vào res.locals để có thể sử dụng ở controller
    const user = res.locals.user; //lấy dữ liệu từ middleware trước đó
    console.log(`User in routeMiddleware:`, user);

    //next luôn nằm cuối cùng của middleware, 
    //nó sẽ gọi middleware tiếp theo trong chuỗi, nếu không có middleware nào nữa thì sẽ trả về response cho client
    next();
}