import jwt, { JwtPayload }  from 'jsonwebtoken'
import Customer from '../models/customers.model';
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
export const checkOrderToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
    const authHeader = req.headers['authorization'];

    console.log('authHeader',authHeader);

    const token = authHeader && authHeader.split(' ')[1];

    //Nếu có token thì giải mả
    if (token) {
      const decoded = jwt.verify(token, globalConfig.JWT_SECRET_KEY as string) as decodedJWT;
      
      console.log('token decoded', decoded);
      
      //try verify customer exits in database
      const customer = await Customer.findById(decoded._id);

      if (!customer) {
        return next(createError(401, 'Unauthorized'));
      }
      //Đăng ký biến customer global trong app
      res.locals.customer = customer;


      
    }
    
    //Nếu ko truyền token thì mặc định là null
    res.locals.customer = null;

    next()
};
