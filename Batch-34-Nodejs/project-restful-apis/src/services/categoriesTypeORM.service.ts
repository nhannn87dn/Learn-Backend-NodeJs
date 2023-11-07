//import Employee from '../models/employees.model';
import { ICategory } from '../types/models';
import { Category } from '../entities/categories.entity';
import {AppDataSource} from '../../data-soucre';
import createError from 'http-errors'
const repository = AppDataSource.getRepository(Category);

// const getAllItems = async (page: number, limit: number) => {
//   // Tương đương: SELECT * FROM employees (SQL)

//   //  0 - 10 skip: 0, take = 10
//   // 10-20   skip: 10, take  10

//   const categories = await repository.find({
//     relations: {
//       products: true,
//     },
//     skip: (page- 1) * limit,
//     take: limit,
//   });
//   return categories
// };

const getAllItems = async (page: number, limit: number) => {
  //Vừa lấy vừa đếm được tổng số record có trong table
  const [categories, totalCount] = await repository.findAndCount({
      order: {
          id: "DESC",
      },
      skip: (page - 1) * limit,
      take: limit,
  });
  
  return {
     categories,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      recordsPerPage: limit
  };
};

const getItemById = async (id: number) => {
  // SELECT * FROM employees WHERE id = id and name= ''
  console.log(id);

  const category = await repository.findOneBy({
    id: id
  })
  return category
 
};

const createItem = async (payload: ICategory) => {
  // Kiểm tra xem email đã tồn tại chưa
  // Lưu xuống database
  console.log(payload);
  //check co slug ko, neu ko thi tao
  //build slug tu name 
  // if(!payload.slug || payload.slug!==''){
  //   payload.slug = buildSlug(payload.name)
  // }

  const category = repository.create(payload);
  const res = await repository.save(category);
  return res;
};

const updateItem = async (id: number, payload: ICategory) => {
  //Check xem ID do con ton tai ko da
  const category = await getItemById(id);
  if(!category){
    throw createError(404, 'Category not found')
  }
  //Merge category và payload lại với nhau
  Object.assign(category, payload);

  const result = await repository.save(category)
  return result;
};

const deleteItem = async (id: number) => {
  //Check xem ID do con ton tai ko da
  const category = await getItemById(id);
  if(!category){
    throw createError(404, 'Category not found')
  }
  const result = await repository.delete({
      id: category.id
  })
  return category;
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};