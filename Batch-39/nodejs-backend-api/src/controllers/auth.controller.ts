import {Request, Response, NextFunction} from 'express'
import authService from '../services/auth.service'
import { sendJsonSuccess } from '../helpers/responseHandler';
const login = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {email, password} = req.body;

    const tokens = await authService.login(email, password);
    sendJsonSuccess(res)(tokens);

  } catch (error) {
    next(error)
  }
}

export default {
  login
}