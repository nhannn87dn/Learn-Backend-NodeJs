import { Request, Response, NextFunction } from "express";
import  authService from '../services/auth.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await authService.AuthLogin(req.body);
    sendJsonSuccess(res)(staff);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * Nhận được req.staff từ auth.middleware forward qua
     */
    const token = await authService.refreshToken(res.locals.staff);
    sendJsonSuccess(res)(token);
  } catch (err) {
    next(err);
  }
};


const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {_id} = res.locals.staff;
    console.log(`res.locals`,res.locals);
    const staff = await authService.getProfile(_id);
    
    sendJsonSuccess(res)(staff);
  } catch (error) {
    next(error);
  }
};


export default {
  authLogin,
  refreshToken,
  getProfile
}