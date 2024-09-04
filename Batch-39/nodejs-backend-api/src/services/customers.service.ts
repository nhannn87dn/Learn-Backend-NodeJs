import createError from 'http-errors';
// Kết nối trực tiếp với Database
import Customer from '../models/customers.model';
import {TCustomer} from '../types/models'
import { globalConfig } from '../constants/configs';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose';

// Lấy tất cả record
const findAll = async ()=>{
   /**
     * SELECT findAll* FROM customers
     */
  const customers = await Customer.find();
  //console.log('<<=== 🚀 customers findAll ===>>');
  return customers
}

// Tìm 1 record theo ID
const findById = async (id: string)=>{
   
    //Đi tìm 1 cái khớp id
     /**
     * SELECT * FROM customers WHERE id = ''
     */
    const customer = await Customer.findById(id)
    
     /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!customer){
      throw createError(400, 'Customer Not Found')
    }

    return customer
}

const createRecord = async (payload: TCustomer)=>{
  console.log('<<=== 🚀 payload ===>>',payload);

  const customer = await Customer.create(payload)

  console.log('<<=== 🚀 create customer ===>>',customer);

  //Trả lại record vừa thêm mới
  return customer
}

const updateById = async (id: string, payload: TCustomer)=>{
  
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const customer = await Customer.findByIdAndUpdate(id, payload, {
      new: true, // nó trả về record sau khi update
    })
    console.log('<<=== 🚀 customer ===>>',customer);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!customer){
      throw createError(400, 'Customer Not Found')
    }
    
    //Return về record vừa đc update
    return customer
}

const deleteById = async (id: string)=>{
  
  //b1 Kiểm tra xem tồn tại customer có id
  const customer = await Customer.findByIdAndDelete(id)

  if(!customer){
    throw createError(400, "Customer Not Found")
  }


  //Return về record vừa xóa
  return customer
}



const getProfile = async(id: ObjectId)=>{
  const customer = await Customer.
  findOne({
    _id: id
  }).
  select('-password -__v');
  
  if(!customer){
    throw createError(400, 'Staff Not Found')
  }
  return customer
}

const login = async(email: string, password: string)=>{
  //b1. Check xem tồn tại customer có email này không
  const customer = await Customer.findOne({
    email: email
  });

  if(!customer){
    throw createError(400, "Invalid email or password")
  }
  //b2. Nếu tồn tại thì đi so sánh mật khẩu xem khớp ko
  const passwordHash = customer.password;
  const isValid = await bcrypt.compareSync(password, passwordHash); // true
  if(!isValid){
    //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
    throw createError(400, "Invalid email or password")
  }

  console.log('<<=== 🚀 Login thành công ===>>');
  //3. Tạo token
  const access_token = jwt.sign(
      {
        _id: customer?._id,
        email: customer.email
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
        _id: customer?._id,
        email: customer.email,
        //role: customer.role,  //phân quyền
      },
      globalConfig.JWT_SECRET_KEY as string,
      {
        expiresIn: '30days', //Xác định thời gian hết hạn của token
        //algorithm: 'RS256' //thuật toán mã hóa
      }
    
  );
  return {
      access_token,
      refresh_token,
  };
}


/**
 * hàm để sinh ra 1 cặp tokken
 * @param customer 
 * @returns 
 */
const getTokens = async (customer: {_id: ObjectId, email: string})=>{
  const access_token = jwt.sign(
    {
      _id: customer._id,
      email: customer.email
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
    _id: customer?._id,
    email: customer.email,
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
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById,
  getProfile,
  login,
  getTokens

}