import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  console.error(error.stack);

  response.status(status).json({ 
        statusCode: status,
        typeCode: 'appError', 
        message: error.message 
  });
};