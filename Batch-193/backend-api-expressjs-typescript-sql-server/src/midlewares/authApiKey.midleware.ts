import { Request, Response, NextFunction } from "express";
import { env } from '../helpers/env.helper';
import createError from "http-errors";

// Middleware xác thực x-api-key
export const authApiKey = (req: Request, res: Response, next: NextFunction) => {
  // Lấy x-api-key từ header
  const apiKey = req.header('x-api-key');

  // Kiểm tra xem x-api-key có tồn tại không
  if (!apiKey) {
    // return res.status(401).json({
    //   status: 'error',
    //   message: 'Missing x-api-key header',
    // });
    throw createError(401, 'Missing x-api-key header');
  }

  // Kiểm tra xem x-api-key có khớp với API_KEY trong env không
  if (apiKey !== env.X_API_KEY) {
    // return res.status(403).json({
    //   status: 'error',
    //   message: 'Invalid x-api-key',
    // });
    throw createError(403, 'Invalid x-api-key');
  }

  // Nếu hợp lệ, chuyển tiếp request
  next();
};