import { Request, Response, NextFunction } from "express";
import  authService from '../services/auth.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  console.log('1 ==> auth req', req.body);
  try {
    const user = await authService.AuthLogin(req.body);
    sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * Nhận được req.user từ auth.middleware forward qua
     */
    const token = await authService.refreshToken(res.locals.user);
    sendJsonSuccess(res)(token);
  } catch (err) {
    next(err);
  }
};

export default {
  authLogin,
  refreshToken
}