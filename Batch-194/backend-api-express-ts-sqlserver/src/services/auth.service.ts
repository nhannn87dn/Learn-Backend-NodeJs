import Staff from "../models/Staff.model";
import createError from "http-errors";
import { generateTokens } from "../utils/jwt";
import { TokenPayload } from "../types/auth";
/** Xác thực login */
const verifyUser = async({
    email,
    password
}: {
    email: string;
    password: string;
}) => {
    //TODO: logic xác thực user
    //step 1: Tìm xem trong Db có user voi email trên ko
    const staff = await Staff.findOne({ email });
    if(!staff){
        throw createError(404, "Staff not found")
    }
    //step 2: Nếu tồn tại thì so tiếp mật khẩu
    const isPasswordValid = staff.comparePassword(password);
    if(!isPasswordValid){
        throw createError(401, "Password is incorrect");
    }
    //step 3: Nếu đúng thì trả về tokens
    //bao gồm access token và refresh token
    const tokens = generateTokens({
        sub: staff._id.toString(), //đổi thành string
        email: staff.email,
        role: staff.role,
    } as TokenPayload)
    return tokens;
}

export default {
    verifyUser
}