import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/response.helper";
import authService from "../services/auth.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await authService.verifyUserByCredentials({
            email: req.body.email,
            password: req.body.password,
        });
        sendJsonSuccess(res, tokens, "Login successfully");
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Sau khi authenticateToken middleware đã xác thực token và lưu user vào res.locals.user
        //Chúng ta có thể lấy user từ res.locals.user
        const user = res.locals.user;
        // Gọi service để làm mới token dựa vào user
        const tokens = await authService.refreshToken(user);
        sendJsonSuccess(res, tokens, "Refresh token successfully");
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        const profile = await authService.getProfile(user.email);
        sendJsonSuccess(res, profile, "Get profile successfully");
    } catch (error) {
        next(error);
    }
};

export default {
    login,
    getProfile,
    refreshToken
};