import {Response} from 'express'

export const sendJsonSuccess = (res: Response,data?:any,message?: string, statusCode?:number)=>{
    const status = statusCode|| 200;
    res.status(status).json({
        statusCode: status,
        message: message || 'Successfully',
        data
    });
}

