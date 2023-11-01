//import Employee from '../models/employees.model';
import { IEmployee } from '../types/models';
import { Employee } from '../entities/employee.entity';
import {AppDataSource} from '../../data-soucre';

const repository = AppDataSource.getRepository(Employee);

const getAllItems = async (page: number, limit: number) => {
  // Tương đương: SELECT * FROM employees (SQL)
  const employees = await repository.find();
  return employees
};


const getItemById = async (id: string) => {
  // SELECT * FROM employees WHERE id = id
  console.log(id);

 
};

const createItem = async (payload: IEmployee) => {
  // Kiểm tra xem email đã tồn tại chưa
  // Lưu xuống database
  
};

const updateItem = async (id: string, payload: IEmployee) => {
 
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