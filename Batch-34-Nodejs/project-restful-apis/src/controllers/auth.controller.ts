import {Request, Response, NextFunction} from 'express'
import authService from '../services/auth.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const login = async(req:Request, res: Response, next: NextFunction)=>{
  try {
    /**
     * payload = {email, password}
     */
    const payload = req.body;
    const result = await authService.login(payload);
    console.log('<<=== 🚀 result ===>>',payload,result);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error)
  }
}

export default {
  login
}