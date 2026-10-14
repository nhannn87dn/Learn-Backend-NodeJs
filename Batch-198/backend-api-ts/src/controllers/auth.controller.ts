import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { sendJsonSuccess } from "../helpers/responseHandler";

const login = async (req: Request, res: Response, next: NextFunction) => {
  // Lấy thông tin đăng nhập từ request body
  const { email, password } = req.body;
  try {
    // Gọi service để xác thực thông tin đăng nhập
    const tokens = await authService.login(email, password);
    // Trả về token cho client
    // res.status(200).json({ tokens });
    sendJsonSuccess(res, tokens, { statusCode: 201, message: "Login successful" });
  }
        catch (error) {
        // Nếu có lỗi, trả về lỗi cho client
        next(error);
    }
}

//get Profile
const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Lấy thông tin người dùng từ request (được thêm bởi middleware xác thực)
    const staff = res.locals.staff;
    // Gọi service để lấy thông tin profile
    const user = await authService.profile(staff._id);
    // Trả về thông tin người dùng cho client
    sendJsonSuccess(res, user, { statusCode: 200, message: "Profile fetched successfully" });
  }
  catch (error) {
    // Nếu có lỗi, trả về lỗi cho client
    next(error);
  }
}

export default {
  login,
  profile
};