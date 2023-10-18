import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import {sendJsonErrors} from '../helpers/responseHandler';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  sendJsonErrors(response, error);

};