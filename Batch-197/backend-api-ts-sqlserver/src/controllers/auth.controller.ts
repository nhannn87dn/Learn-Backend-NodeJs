import { type NextFunction, type Request, type Response } from 'express';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';
import authService from '../services/auth.service';

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await authService.login(req.body.email, req.body.password);

        sendJsonSuccess(res, result)
    }
    catch (error) {
        next(error)
    }
};

export default {
    login
}