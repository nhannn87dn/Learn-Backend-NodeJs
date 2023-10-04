import {Request, Response, NextFunction} from 'express'
//Tạo và export luôn
export default function (req: Request, res: Response, next: NextFunction) {
    //Logic Here
    console.log(1);
    
    //End with next() -> chuyển tiếp sang middleware khác nếu có
    next();
  };