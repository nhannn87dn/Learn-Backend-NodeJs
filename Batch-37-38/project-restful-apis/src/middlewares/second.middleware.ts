import {Request,Response, NextFunction} from 'express'

interface newRequest extends Request {
    aptech: any
}
//Tạo và export luôn
export const second =  (req: newRequest, res: Response, next: NextFunction) => {
    //middle này nó có thể nhận giá trị từ middleware khác gửi thông qua request
    console.log('second', req.aptech);
  
   
    next();
};