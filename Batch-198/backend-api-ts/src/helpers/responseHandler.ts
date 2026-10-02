import { Response } from 'express';
import { Status, SUCCESS, ERROR } from '../constants/responseConstants';


/**
 * Mặc định trả về status 200
 * 
 */
export const sendJsonSuccess = (res: Response, data: any = null, status: Status = SUCCESS.OK): void => {
    res.status(status.statusCode).json({
        success: true,
        statusCode: status.statusCode, 
        message: status.message, 
        data
    });
};

/**
 * Mặc định trả về status 500
 * 
 */
export const sendJsonError = (res: Response, status: Status = ERROR.SERVER_ERROR): void => {
    res.status(status.statusCode).json({
        success: false,
        statusCode: status.statusCode,
        message: status.message,
        data: null
    });
};


export { SUCCESS, ERROR };
