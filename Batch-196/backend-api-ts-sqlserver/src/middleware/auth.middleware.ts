import jwt, { JwtPayload }  from 'jsonwebtoken'
import staffService from '../services/staffs.service';
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { ENV } from '../config/env';

interface decodedJWT extends JwtPayload {
   sub: string
   email: string
   role: string
 }

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized 1'));
    }

    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as decodedJWT;

      console.log('<<=== 🚀 Decoded JWT ===>>', decoded);

      if(!decoded || !decoded.sub) {
        return next(createError(401, 'Unauthorized 2'));
      }
      //try verify staff exits in database
      const staff = await staffService.findById(decoded.sub);

      if (!staff) {
        return next(createError(401, 'Unauthorized 3'));
      }
      console.log('<<=== 🚀 Staff Found ===>>', staff);
      //Đăng ký biến staff global trong app
      res.locals.staff = staff;

      next();
    } catch (err) {
      return next(createError(403, 'Forbidden 1'));
    }
};

export const authorize = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.Staff or 'Staff') 
    // or an array of roles (e.g. [Role.Admin, Role.Staff] or ['Admin', 'Staff'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.staff.role && !roles.includes(res.locals.staff.role)) {
        return next(createError(403, 'Forbidden 2'));
      }
        // authentication and authorization successful
        next();
    }
}
