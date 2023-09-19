import { Express, NextFunction, Request, Response } from 'express';

const sendJsonSuccess = (res: Response, message: string, code: number) => {
    return (data: any, globalData: any) => {
      code = code || 200;
      res.status(code).json({
        statusCode: code,
        message: message || 'Success',
        data,
        ...globalData,
      });
    };
  };
  
  const sendJsonErrors = (res: Response, error: any) => {
    console.log(error);
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: error.message || 'Internal Server Error',
    });
  };
  
  module.exports = {
    sendJsonSuccess,
    sendJsonErrors,
  };