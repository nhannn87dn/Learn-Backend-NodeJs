import Staff from "../models/staff.model";
import createError from "http-errors";
import argon2 from "argon2";
import { generateToken } from "../helpers/jwt.helper";


const login = async (email: string, password: string) => {

    console.log('<<=== 🚀 email ===>>',email);
    console.log('<<=== 🚀 password ===>>',password);


    //1. check if email exists
    const staff = await Staff.findOne({ email: email.toLowerCase() });
    if (!staff) {
      throw createError(401, 'Invalid email or password');
    }
    //2. check if password matches
    const isPasswordValid = await argon2.verify(staff.password, password);
    if (!isPasswordValid) {
      throw createError(401, 'Invalid email or password');
    }

    //3. Nếu pass 1 và 2 thì trả lại thông tin theo nhu cầu
    //return về access_token và refresh_token
    const accessToken = generateToken({ id: staff._id, role: staff.role }, '15m');
    const refreshToken = generateToken({ id: staff._id, role: staff.role }, '7d');  


    return {
      accessToken,
      refreshToken,
    };
}

export default {
    login
}