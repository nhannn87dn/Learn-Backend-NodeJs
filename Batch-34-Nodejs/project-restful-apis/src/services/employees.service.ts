import Employee from '../models/employees.model';
import { IEmployee } from '../types/models';

/**
 * Service - Dịch vụ
 * - Đi xử lí logic
 * - Tương tác trực tiếp với Database
 */

/**
 * Các hàm trong service phải có return
 */

const getAllItems = async (page: number, limit: number) => {
  // Tương đương: SELECT * FROM employees (SQL)
  const employees = await Employee.find().
  select('-__v').
  skip((page - 1) * limit).
  limit(limit);

  /// get total documents in the Categories collection 
  const totalRecords = await Employee.count();

  //return response with Categories, total pages, and current page
  return {
    employees,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit
  };
};


const getItemById = async (id: string) => {
  // SELECT * FROM employees WHERE id = id
  console.log(id);

  const employee = await Employee.findById(id);

  return employee;
};

const createItem = async (payload: IEmployee) => {
  // Kiểm tra xem email đã tồn tại chưa
  // Lưu xuống database
  const employee = await Employee.create(payload);
  return employee;
};

const updateItem = async (id: string, payload: IEmployee) => {
  const employee = Employee.findByIdAndUpdate(id, payload, {
    new: true, //==> trả về employee với thông tin sau khi đã thay đổi
  });
  return employee;
};

const deleteItem = async (id: string) => {
  const employee = Employee.findByIdAndDelete(id);
  return employee;
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};