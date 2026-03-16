import authService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
    try {
        const data = await authService.login(email, password);
        sendJsonSuccess({
          res,
          status: SUCCESS.OK,
          data: data,
        });
    }
    catch (error) {
        next(error);
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const staff = res.locals.staff;
  try {
    const data = await authService.refreshToken(staff._id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const staff = res.locals.staff;
  try {
    const data = await authService.getProfile(staff._id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  refreshToken,
  getProfile
}