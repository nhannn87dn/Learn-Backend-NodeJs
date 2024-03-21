import {Request,Response, NextFunction} from 'express'

interface newRequest extends Request {
    aptech: any
}
//Tạo và export luôn
export const logs =  (req: newRequest, res: Response, next: NextFunction): void => {
    //Logic Here
    console.log('LOGGED', req.body, req.params, req.query);
  
    //Có thể gắn Thêm vào request một biến
    req.aptech = { name: 'Softech', add: '38 yen bai' };
  
    //End with next() -> chuyển tiếp sang middleware khác nếu có
    next();
};