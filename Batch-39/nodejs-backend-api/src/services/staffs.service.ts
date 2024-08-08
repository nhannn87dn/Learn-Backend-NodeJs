import createError from 'http-errors';
// Kết nối trực tiếp với Database
import Staff from '../models/staffs.model';
import {TStaff} from '../types/models'
// Lấy tất cả record
const findAll = async ()=>{
   /**
     * SELECT findAll* FROM staffs
     */
  const staffs = await Staff.find();
  //console.log('<<=== 🚀 staffs findAll ===>>');
  return staffs
}

// Tìm 1 record theo ID
const findById = async (id: string)=>{
   
    //Đi tìm 1 cái khớp id
     /**
     * SELECT * FROM staffs WHERE id = ''
     */
    const staff = await Staff.findById(id)
    
     /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!staff){
      throw createError(400, 'Staff Not Found')
    }

    return staff
}

const createRecord = async (payload: TStaff)=>{
  console.log('<<=== 🚀 payload ===>>',payload);

  const staff = await Staff.create(payload)

  console.log('<<=== 🚀 create staff ===>>',staff);

  //Trả lại record vừa thêm mới
  return staff
}

const updateById = async (id: string, payload: TStaff)=>{
  
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const staff = await Staff.findByIdAndUpdate(id, payload, {
      new: true, // nó trả về record sau khi update
    })
    console.log('<<=== 🚀 staff ===>>',staff);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!staff){
      throw createError(400, 'Staff Not Found')
    }
    
    //Return về record vừa đc update
    return staff
}

const deleteById = async (id: string)=>{
  
  //b1 Kiểm tra xem tồn tại staff có id
  const staff = await Staff.findByIdAndDelete(id)

  if(!staff){
    throw createError(400, "Staff Not Found")
  }


  //Return về record vừa xóa
  return staff
}


export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById
}