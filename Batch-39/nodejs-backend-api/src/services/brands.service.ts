import createError from 'http-errors';
// Kết nối trực tiếp với Database
import Brand from '../models/brands.model';
import {ObjectId} from 'mongoose'

type TBrand = {
  _id: ObjectId;
  brand_name: string;
  slug: string;
  order: number;
  description?: string;
}

// Lấy tất cả record
const findAll = async ()=>{
   /**
     * SELECT * FROM brands
     */
  const brands = await Brand.find();
  //console.log('<<=== 🚀 brands ===>>',brands);
  return brands
}

// Tìm 1 record theo ID
const findById = async (id: string)=>{
   
    //Đi tìm 1 cái khớp id
     /**
     * SELECT * FROM brands WHERE id = ''
     */
    const brand = await Brand.findById(id)
    
     /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!brand){
      throw createError(400, 'Brand Not Found')
    }

    return brand
}

const createRecord = async (payload: TBrand)=>{
  console.log('<<=== 🚀 payload ===>>',payload);

  const brand = await Brand.create(payload)

  console.log('<<=== 🚀 create brand ===>>',brand);

  //Trả lại record vừa thêm mới
  return brand
}

const updateById = async (id: string, payload: TBrand)=>{
  
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const brand = await Brand.findByIdAndUpdate(id, payload, {
      new: true, // nó trả về record sau khi update
    })
    console.log('<<=== 🚀 brand ===>>',brand);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!brand){
      throw createError(400, 'Brand Not Found')
    }
    
    //Return về record vừa đc update
    return brand
}

const deleteById = async (id: string)=>{
  
  //b1 Kiểm tra xem tồn tại brand có id
  const brand = await Brand.findByIdAndDelete(id)

  if(!brand){
    throw createError(400, "Brand Not Found")
  }


  //Return về record vừa xóa
  return brand
}


export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById
}