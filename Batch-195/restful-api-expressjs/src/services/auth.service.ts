import Staff from "../models/staff.model";
import createError from "http-errors";
import argon2 from "argon2";
import { generateToken } from "../helpers/jwt.helper";
import { getEnv } from "../common/configs/env";


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
    const accessToken = generateToken({ id: staff._id, role: staff.role }, getEnv().ACCESS_TOKEN_EXPIRATION);
    const refreshToken = generateToken({ id: staff._id, role: staff.role }, getEnv().REFRESH_TOKEN_EXPIRATION);  

    //

    return {
      accessToken,
      refreshToken,
    };
}

const refreshToken = async (staffId: string) => {
  //tạo mới access token và refresh token
  const accessToken = generateToken({ id: staffId }, getEnv().ACCESS_TOKEN_EXPIRATION);
  const refreshToken = generateToken({ id: staffId }, getEnv().REFRESH_TOKEN_EXPIRATION);
  return {
    accessToken,
    refreshToken,
  };
}

const getProfile = async (staffId: string) => {
  const staff = await Staff
  .findById(staffId)
  .select('-password -__v -createdAt -updatedAt');
  if (!staff) {
    throw createError(404, 'Staff not found');
  }
  return staff;
}

export default {
    login,
    refreshToken,
    getProfile
}