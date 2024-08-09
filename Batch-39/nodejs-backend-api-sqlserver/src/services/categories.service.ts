import createError from 'http-errors';
// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Category } from '../databases/entities/category.entity';
import { Test } from "../databases/entities/test.entity";

const categoryRepository = myDataSource.getRepository(Category)

const testRepository = myDataSource.getRepository(Test)

const getAllTest = async ()=>{
  return await testRepository.find()
}


// Lấy tất cả record
const findAll = async ()=>{
    const categories = await categoryRepository.find()
  return categories
}


export default {
  findAll,
  getAllTest
 
}