import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt  from 'jsonwebtoken';
import Staff from '../models/staff.model';
import { env } from '../helpers/env.helper';
import { Response } from 'express';

const login = async({
    email,
    password
}: {
    email: string,
    password: string,
})=>{
    //logic đăng nhập
    //Kiểm tra email có tồn tại không
    const staff = await Staff.findOne({
        email,
        active: true //chỉ cho phép acc có trạng thái active mới đc login
    })
    if (!staff) {
        //Báo lỗi chung chung
        //Lí do để hacker biết email đúng hay sai
        throw createError(400, 'Email or password is invalid');
    }

    //Kiểm tra mật khẩu
    //nếu mật khâu chưa được mã hóa
    // if(staff.password !== password){
    //     throw createError(400, 'Email or password is invalid');
    // }

    //Sử dụng hàm so sánh mật khẩu đã được mã hóa
    const passwordHash = staff.password;
  const isValid = await bcrypt.compare(password, passwordHash); // true
  if(!isValid){
    //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
    throw createError(400, "Invalid email or password")
  }

    //login thành công
    //Tạo token
    const accessToken = jwt.sign(
        { _id: staff._id, email: staff.email},
        env.JWT_SECRET as string,
        {
          expiresIn: '24h', // expires in 24 hours (24 x 60 x 60)
        }
      );
    
      const refreshToken  = jwt.sign(
        { _id: staff._id, email: staff.email},
        env.JWT_SECRET as string,
        {
          expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
        }
      );
    return {
        accessToken,
        refreshToken
    }
}

const getProfile = async(res: Response)=>{
    const {staff} = res.locals;
    //return without password
    return staff;
}

export default {
    login,
    getProfile
}