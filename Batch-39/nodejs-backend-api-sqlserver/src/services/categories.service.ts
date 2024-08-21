import createError from 'http-errors';
// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Category } from '../databases/entities/category.entity';

const categoryRepository = myDataSource.getRepository(Category)


// Lấy tất cả record
const findAll = async ()=>{
    const categories = await categoryRepository.find()
  return categories
}

const findById = async (id: number)=>{
  const category = await categoryRepository.findOne({
   where: {
    category_id: id
   }
  });
  //Check ton tai theo Id
  if(!category){
    throw createError(400, 'Category Not Found')
  }
  return category
}

const updateById = async (id: number, payload: any)=>{
  //Kiem tinh ton tai truoc
  const category = await findById(id);
  //Cap nhat
  Object.assign(category, payload);
  //save lai
  const updated = await categoryRepository.save(category)
  return updated

}

//Create new record
const create = async (payload: any)=>{
  const category =  categoryRepository.create(payload)
  //lu lai
  await categoryRepository.save(category)
  return category
}

//Delete a record

const deleteById = async (id: number) => {
  //Kiem tra tinh ton tai cua Id
  const category = await findById(id);
  //xoa
  await categoryRepository.delete({ 
    category_id: category.category_id 
  })
  return category
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById
}