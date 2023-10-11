import Category from '../models/categories.model'
import {ICategory} from '../types/models';
/**
 * Service == Dịch vụ
 * - Đi xử lí logic
 * - Tương tác trực tiếp với Database
 */

/**
 * Các hàm trong serice phải có return
 */


const getAllItems = async () => {
  //Tương đương: SELECT * categories (SQL)
  const categories = Category.find();
  return categories;
};

const getItemById = async (id: string) => {
 //SELECT * categories WHERE id = id
 console.log(id);
 
 const user = await Category.findById(id);

 return user;
};

const createItem = async (payload: ICategory) => {
  //Kiểm tra xem email đã tồn tại chưa
  // Lưu xuống database
  const user =  await Category.create(payload);
  return user; 
  
};

const updateItem = async (id: string, payload: ICategory)  => {
  const user = Category.findByIdAndUpdate(id, payload, {
    new: true, //==> trả về user với thông tin sau khi đã thay đổi
  });
  return user;
    
};

const deleteItem = async (id: string) => {
  const user = Category.findByIdAndDelete(id);
  //DELETE FROM categories WHERE _id = id
  //const userv2 = Category.findOneAndDelete({_id: id}); //==> trả về user với thông tin trước khi xóa
  return user;
 
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};
