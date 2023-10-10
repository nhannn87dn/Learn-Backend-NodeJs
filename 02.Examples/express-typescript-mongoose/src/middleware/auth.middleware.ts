import jwt, { JwtPayload }  from 'jsonwebtoken'
import User from '../models/User.model'
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import {appConfigs} from '../constants/configs';

interface decodedJWT extends JwtPayload {
   _id?: string
 }

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    try {
      const decoded = jwt.verify(token, appConfigs.JWT_SECRET as string) as decodedJWT;
      //try verify user exits in database
      const user = await User.findById(decoded._id);

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }
      //Đăng ký biến user global trong app
      res.locals = user;

      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

export const authorize = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.user.role && !roles.includes(res.locals.user.role)) {
        return next(createError(403, 'Forbidden'));
      }
        // authentication and authorization successful
        next();
    }
}
