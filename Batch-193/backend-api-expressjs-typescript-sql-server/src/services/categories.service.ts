import createError from "http-errors";
import { categoryRepository } from "../repositories/category.repository";
const findAll = async () => {
  const categories = await categoryRepository.find()
  return categories;
};
 
const findById = async (id: number) => {
  const category = await categoryRepository.find({
    where: {
      id
    }
  })
  if(!category){
    throw createError(400, "Category not found")
  }
  return category;
};

const create = async (payload: ICategoryDTO) => {
   const category = categoryRepository.create(payload);
  await categoryRepository.save(category)
  return category;
};

const updateById = async (id: number, payload: ICategoryDTO) => {
    //check ton tai
    const category = await findById(id)
    //tron lai voi nhau
    Object.assign(category, payload)

    //lưu lai
   const result =  await categoryRepository.save(category)

  return result;
};

const deleteById = async (id: number) => {
   //check ton tai
    const category = await findById(id)
    const result = await categoryRepository.delete(id);
    console.log('<<=== 🚀 result ===>>',result);
    return category; //return về category đã xóa để có thể sử dụng trong response
  
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
