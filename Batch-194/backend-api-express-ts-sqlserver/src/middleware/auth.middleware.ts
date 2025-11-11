import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import Staff from '../models/Staff.model';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('<<=== 🚀 token ===>>',token);

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized 1'));
    }



    try {
        //Giai mã token để xác thực người dùng
      const decoded = verifyToken(token);

      console.log('<<=== 🚀 decoded ===>>',decoded);
      //try verify staff exits in database
      const staff = await Staff
      .findById(decoded.sub)
      .select('-password')
      

      console.log('<<=== 🚀 staff ===>>',staff);

      if (!staff) {
        return next(createError(401, 'Unauthorized 2'));
      }
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
        return next(createError(403, 'Missing permission'));
      }
        // authentication and authorization successful
        next();
    }
}