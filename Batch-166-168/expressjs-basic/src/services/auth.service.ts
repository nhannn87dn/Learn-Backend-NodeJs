import Staff from "../models/staff.model";
import createError from "http-errors";
import jwt  from 'jsonwebtoken';
import { globalConfig } from "../constants/config";
import { IStaff } from "../types/model";

const login = async(payload: {email: string, password: string})=>{
    //Step1: Tìm xem trong collection Staff co chua email  nay khong
    const staff = await Staff.findOne({
        email: payload.email
    });
    if(!staff){
        throw createError(400, "Staff not found")
    }
    //Step2: So sánh mật khẩu đã gửi lên với mật khẩu trong DB
    // if(payload.password !== staff.password){
    //     throw createError(400, "Email or password is invalid")
    // }
    const isValidPassword = await staff.comparePassword(payload.password);
    console.log('<<=== 🚀 isValidPassword ===>>',isValidPassword, payload.password, staff.password);
    if(!isValidPassword){
        throw createError(400, "Email or password is invalid")
    }

    //Step 3: Dung email, pass ==> tao tokens
    //Tồn tại thì trả lại thông tin staff kèm token
  const access_token = jwt.sign(
    {   
        //KO ma hoa nhung thong tin nhay cam
        _id: staff._id, 
        email: staff.email
    },
    globalConfig.PRIVATE_KEY,
    {
        expiresIn: '7d', // expires in 7 days
    }
  );

  const refresh_token  = jwt.sign(
    { _id: staff._id, email: staff.email},
    globalConfig.PRIVATE_KEY,
    {
      expiresIn: '30d', // expires in 30 days
    }
  );

    return {
        access_token,
        refresh_token
    }
}

const reFreshToken = async(staff: {_id: string, email: string})=>{
    const access_token = jwt.sign(
        {   
            //KO ma hoa nhung thong tin nhay cam
            _id: staff._id, 
            email: staff.email
        },
        globalConfig.PRIVATE_KEY,
        {
            expiresIn: '7d', // expires in 7 days
        }
      );
    
      const refresh_token  = jwt.sign(
        { _id: staff._id, email: staff.email},
        globalConfig.PRIVATE_KEY,
        {
          expiresIn: '30d', // expires in 30 days
        }
      );
      return {
        access_token,
        refresh_token
    }

}


const profile = async(staff: {_id: string, email: string, password: string | undefined})=>{
    //dung thu vien lodash de tach mat khau ra
    staff.password = undefined;
    return staff
}

export default {
    login,
    reFreshToken,
    profile
}