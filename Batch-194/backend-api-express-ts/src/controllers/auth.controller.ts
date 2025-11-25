import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log('<<=== 🚀 email ===>>',email);
        console.log('<<=== 🚀 password ===>>',password);
        const result = await authService.verifyUser({ email, password });
        sendJsonSuccess({
            res,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

//get Profile
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    //Nhận thông tin staff từ biến toàn cục
    const staff = res.locals.staff;
    
    //TODO: Nếu staff có chứa password thì phải loại bỏ trước khi trả về
    //const {password, ...staffWithoutPassword} = staff;

    sendJsonSuccess({
        res,
        data: {
            id: staff._id,
            email: staff.email,
            fullName: staff.fullName,
            role: staff.role,
            active: staff.active,
        },
        //data: staffWithoutPassword
    });
}

//refresh token
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = res.locals.staff;
        const result = await authService.refreshToken(staff);
        sendJsonSuccess({
            res,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default {
    login,
    getProfile,
    refreshToken,
}