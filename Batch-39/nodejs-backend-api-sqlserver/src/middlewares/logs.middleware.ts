import {Request, Response, NextFunction} from 'express'

export interface CustomRequest extends Request  {
  user: {
    name: string;
  }
}

export const logsMiddleware = (req: CustomRequest, res: Response, next: NextFunction)=>{
  //Log ra các thùng hàng của Request
  // console.log('<<=== 🚀 req.params ===>>',req.params);
  // console.log('<<=== 🚀 req.query ===>>',req.query);
  // console.log('<<=== 🚀 req.body ===>>',req.body);

  req.user = {
    name: 'Nhan'
  }

  //console.log('<<=== 🚀 req ===>>',req);

  //Chuyển tiếp sang middleware tiếp theo nếu có
  next();
}