import {Response} from 'express';
import createError from 'http-errors';
/**
 * 
 * @param res  Response
 * @param message  string Message
 * @param code number HTTP response status code
 * @returns json string
 * USAGE:
 * sendJsonSuccess(res)(); //No data return
 * sendJsonSuccess(res)(users); //with data
 */
const sendJsonSuccess = (res: Response, message = 'Success', code = 200) => {
    return (data: any = null) => {
      const resData = data ? { statusCode: code, message, data} : { statusCode: code, message};
      res.status(code).json(resData);
    };
  };
  
  /**
   * 
   * @param req Request object
   * @param res Response object
   * @param error error object
   * @returns json response
   */
  const sendJsonErrors = (res: Response, error: any) => {
    console.log("sendJsonErrors",error.name);
    const status = error.statusCode || error.status || 500;

    return res.status(status).json({
      statusCode: status,
      errorType: error.name || 'UnknownName',
      message: error.message || 'Unhandled Error'
      
    });
  };
  
export {
    sendJsonSuccess,
    sendJsonErrors,
  };