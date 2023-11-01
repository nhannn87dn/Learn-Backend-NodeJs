//import Employee from '../models/employees.model';
import { ICategory } from '../types/models';
import { Category } from '../entities/categories.entity';
import {AppDataSource} from '../../data-soucre';

const repository = AppDataSource.getRepository(Category);

const getAllItems = async (page: number, limit: number) => {
  // Tương đương: SELECT * FROM employees (SQL)
  const categories = await repository.find();
  return categories
};


const getItemById = async (id: string) => {
  // SELECT * FROM employees WHERE id = id
  console.log(id);

 
};

const createItem = async (payload: ICategory) => {
  // Kiểm tra xem email đã tồn tại chưa
  // Lưu xuống database
  
};

const updateItem = async (id: string, payload: ICategory) => {
 
};

const deleteItem = async (id: string) => {
  
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};