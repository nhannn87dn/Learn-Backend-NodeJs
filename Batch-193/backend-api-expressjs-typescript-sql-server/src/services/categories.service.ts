import createError from "http-errors";
import { categoryRepository } from "../repositories/category.repository";
const findAll = async () => {
  const categories = await categoryRepository.find()
  return categories;
};
 
const findById = async (id: string) => {
  
  return [];
};

const create = async (payload: ICategoryDTO) => {
   const category = categoryRepository.create(payload);
  await categoryRepository.save(category)
  return category;
};

const updateById = async (id: string, payload: ICategoryDTO) => {
  


  return [];
};

const deleteById = async (id: string) => {
    return []; //return về category đã xóa để có thể sử dụng trong response
  
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
