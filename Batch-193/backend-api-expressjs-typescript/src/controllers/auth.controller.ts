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
        //Sau khi authenticateToken middleware đã xác thực token và lưu staff vào res.locals.staff
        //Chúng ta có thể lấy staff từ res.locals.staff
        const staff = res.locals.staff;
        // Gọi service để làm mới token dựa vào staff
        const tokens = await authService.refreshToken(staff);
        sendJsonSuccess(res, tokens, "Refresh token successfully");
    } catch (error) {
        next(error);
    }
};



const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Sau khi authenticateToken middleware đã xác thực token và lưu staff vào res.locals.staff
        //Chúng ta có thể lấy staff từ res.locals.staff
        const staff = res.locals.staff;
        
        sendJsonSuccess(res, staff, "Successfully");
    } catch (error) {
        next(error);
    }
};




export default {
    login,
    refreshToken,
    getProfile
};