import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  next(createError(404));
};