import createError from 'http-errors';
import Customer from '../models/customer.model';
import { TCustomer } from '../types/model';

// Lấy tất cả record
const getAll = async (query: any)=>{
   /**
     * SELECT findAll* FROM customers
     */
  const customers = await Customer.find();
  //console.log('<<=== 🚀 customers findAll ===>>');
  return customers
}

// Tìm 1 record theo ID
const getById = async (id: string)=>{
   
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

const create = async (payload: TCustomer)=>{
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




export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}