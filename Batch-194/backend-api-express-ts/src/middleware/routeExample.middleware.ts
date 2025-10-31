import {Request, Response, NextFunction} from 'express'
export const routeExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //Xu ly logic o day
    console.log("--> Route example middleware:");

    /* nhan duoc thong tin user tu app middleware */
    console.log("User info from app middleware:", res.locals.user);

 next(); //Chuyen tiep request sang middleware hoac controller tiep theo
}