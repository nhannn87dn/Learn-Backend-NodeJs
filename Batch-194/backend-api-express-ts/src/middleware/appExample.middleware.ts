import {Request, Response, NextFunction} from 'express'
export const appExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //Xu ly logic o day
    console.log("Request received:", req.method, req.url);

    res.locals.user = { id: 1, name: "John Doe" }; //Example: them thong tin user vao res.locals

 next(); //Chuyen tiep request sang middleware hoac controller tiep theo
}