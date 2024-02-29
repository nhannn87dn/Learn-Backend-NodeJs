import Customer from '../models/customers.model';
import { ICustomer } from '../types/models';
import createError from 'http-errors'
/**
 * Service - Dịch vụ
 * - Đi xử lí logic
 * - Tương tác trực tiếp với Database
 */

/**
 * Các hàm trong service phải có return
 */

const getAllItems = async (page: number, limit: number) => {
  // Tương đương: SELECT * FROM customers (SQL)
  const customers = await Customer.find().
  select('-__v').
  skip((page - 1) * limit).
  limit(limit);
  // get total documents in the Categories collection 
  const totalRecords = await Customer.countDocuments();

  //return response with Categories, total pages, and current page
  return {
    customers,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit
  };
};


const getItemById = async (id: string) => {
  // SELECT * FROM customers WHERE id = id
  console.log(id);

  const customer = await Customer.findById(id);

  return customer;
};

const createItem = async (payload: ICustomer) => {
  //TODO: Kiểm tra xem email đã tồn tại chưa
  const isEmailExits = await Customer.findOne({
    email: payload.email
  });
  //Nếu tồn tại
  if(isEmailExits){
    throw createError(500, 'Email is already')
  }
  // Lưu xuống database
  const customer = await Customer.create(payload);
  return customer;
};

const updateItem = async (id: string, payload: ICustomer) => {
  const customer = Customer.findByIdAndUpdate(id, payload, {
    new: true, //==> trả về customer với thông tin sau khi đã thay đổi
  });
  return customer;
};

const deleteItem = async (id: string) => {
  const customer = Customer.findByIdAndDelete(id);
  return customer;
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};