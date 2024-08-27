import createError from 'http-errors';
import Staff from "../models/staffs.model"
import bcrypt from "bcrypt";
import { TStaff } from '../types/models';
import jwt from 'jsonwebtoken'
import { globalConfig } from '../constants/configs';
import { ObjectId } from 'mongoose';

const getProfile = async(id: ObjectId)=>{
  const staff = await Staff.
  findOne({
    _id: id
  }).
  select('-password -__v');
  
  if(!staff){
    throw createError(400, 'Staff Not Found')
  }
  return staff
}

const login = async(email: string, password: string)=>{
  //b1. Check xem tồn tại staff có email này không
  const staff = await Staff.findOne({
    email: email
  })

  if(!staff){
    throw createError(400, "Invalid email or password")
  }
  //b2. Nếu tồn tại thì đi so sánh mật khẩu xem khớp ko
  const passwordHash = staff.password;
  const isValid = await bcrypt.compareSync(password, passwordHash); // true
  if(!isValid){
    //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
    throw createError(400, "Invalid email or password")
  }

  console.log('<<=== 🚀 Login thành công ===>>');
  //3. Tạo token
  const access_token = jwt.sign(
      {
        _id: staff?._id,
        email: staff.email
      },
      globalConfig.JWT_SECRET_KEY as string,
      {
        expiresIn: '7days', //Xác định thời gian hết hạn của token
        //algorithm: 'RS256' //thuật toán mã hóa
      }
  );

  //Fresh Token hết hạn lâu hơn
  const refresh_token = jwt.sign(
    {
      _id: staff?._id,
      email: staff.email,
      //role: staff.role,  //phân quyền
    },
    globalConfig.JWT_SECRET_KEY as string,
    {
      expiresIn: '30days', //Xác định thời gian hết hạn của token
      //algorithm: 'RS256' //thuật toán mã hóa
    }
);


  //4. Trả về token về cho client

  return {
    access_token,
    refresh_token,
  }
}



/**
 * hàm để sinh ra 1 cặp tokken
 * @param staff 
 * @returns 
 */
const getTokens = async (staff: {_id: ObjectId, email: string})=>{
  const access_token = jwt.sign(
    {
      _id: staff._id,
      email: staff.email
    },
    globalConfig.JWT_SECRET_KEY as string,
    {
      expiresIn: '7days', //Xác định thời gian hết hạn của token
      //algorithm: 'RS256' //thuật toán mã hóa
    }
);

//Fresh Token hết hạn lâu hơn
const refresh_token = jwt.sign(
  {
    _id: staff?._id,
    email: staff.email,
    //role: staff.role,  //phân quyền
  },
  globalConfig.JWT_SECRET_KEY as string,
  {
    expiresIn: '30days', //Xác định thời gian hết hạn của token
    //algorithm: 'RS256' //thuật toán mã hóa
  }
)
return {access_token, refresh_token}
}

export default {
  login,
  getProfile,
  getTokens
}