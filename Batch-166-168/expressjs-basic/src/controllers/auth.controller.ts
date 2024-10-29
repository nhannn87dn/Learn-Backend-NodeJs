import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import authService from "../services/auth.service";
/* get ALl brands */
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};
/*
Dungf khi access-token het han, va ban can lam tuoi
*/
const reFreshToken =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Lấy thong tin staff dang nhap trong request
    const staff = res.locals.staff;

    const result = await authService.reFreshToken(staff);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

const profile =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Lấy thong tin staff dang nhap trong request
    const staff = res.locals.staff;

    const result = await authService.profile(staff);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
}
export default {
    login,
    reFreshToken,
    profile
}