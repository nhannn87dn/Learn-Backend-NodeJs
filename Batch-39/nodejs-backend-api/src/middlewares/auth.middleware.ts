import jwt, { JwtPayload }  from 'jsonwebtoken'
import Staff from '../models/staffs.model';
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { globalConfig } from '../constants/configs';

interface decodedJWT extends JwtPayload {
   _id?: string
 }

 /**
  * Check token
  * @param req 
  * @param res 
  * @param next 
  */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
    const authHeader = req.headers['authorization'];

    console.log('authHeader',authHeader);

    const token = authHeader && authHeader.split(' ')[1];

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }
    // Nếu mọi thứ ok rồi, có token hợp lệ
    try {
        //Giai ma token
      const decoded = jwt.verify(token, globalConfig.JWT_SECRET_KEY as string) as decodedJWT;
      
      console.log('token decoded', decoded);
      
      //try verify staff exits in database
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

/**
 * Check quyền truy cập
 * @param roles string[]
 */
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
