import jwt, { JwtPayload }  from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import Staff from '../models/staff.model';
import { ENV } from '../config/env';

interface decodedJWT extends JwtPayload {
   _id?: string
 }
// Lớp bảo vệ các route cần xác thực (authentication) và phân quyền (authorization)
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Step 1: check header authorization có tồn tại hay không
  const authHeader = req.headers['authorization'];
  // kiểm tra token có được đính kèm không
    const token = authHeader && authHeader.split(' ')[1];

     //Nếu không có token, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    //Nếu có thì giải mã token ra để xác thực thông tin
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as decodedJWT;
      //Kiểm tra xem staff có tồn tại trong database hay không
      //Vì có khả năng token bị làm giả, hoặc staff đã bị xóa khỏi database nhưng token vẫn còn hợp lệ
      const staff = await Staff.findById(decoded._id);

      if (!staff) {
        return next(createError(401, 'Unauthorized'));
      }
      //Đăng ký biến staff global trong app
      res.locals.staff = staff;

      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

//check role of staff to access the route
export const authorize = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.Staff or 'Staff') 
    // or an array of roles (e.g. [Role.Admin, Role.Staff] or ['Admin', 'Staff'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.staff.role && !roles.includes(res.locals.staff.role)) {
        return next(createError(403, 'Forbidden'));
      }
        // authentication and authorization successful
        next();
    }
}
