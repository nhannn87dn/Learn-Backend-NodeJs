import {Request, Response} from 'express';
/**
 * 
 * @param res  Response
 * @param message  string Message
 * @param code number HTTP response status code
 * @returns json string
 * USAGE:
 * sendJsonSuccess(res)(); //No data, dataGlobal return
 * sendJsonSuccess(res)(users); //with data
 * sendJsonSuccess(res)(users, dataGlobal); //with data, dataGlobal
 */
const sendJsonSuccess = (res: Response, message = 'Success', code = 200) => {
    return (data: any = undefined, globalData: any = undefined) => {
      if (data === undefined) {
        data = {}; // Giá trị mặc định cho data
      }
  
      if (globalData === undefined) {
        globalData = {}; // Giá trị mặc định cho globalData
      }

      res.status(code).json({
        statusCode: code,
        message: message,
        data,
        ...globalData,
      });
    };
  };
  
  /**
   * 
   * @param req Request object
   * @param res Response object
   * @param error error object
   * @returns json response
   */
  const sendJsonErrors = (req: Request, res: Response, error: any) => {
    console.log("sendJsonErrors",error);
    return res.status(error.status || 500).json({
      statusCode: error.status || 500,
      message: error.message || 'Unhandled Error',
      error,
    });
  };
  
export {
    sendJsonSuccess,
    sendJsonErrors,
  };