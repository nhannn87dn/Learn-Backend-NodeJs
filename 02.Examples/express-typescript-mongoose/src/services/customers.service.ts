import createError from 'http-errors';
import Customer from '../models/Customer.model';
import { ICustomer } from "../types/models";

/**
* Lấy tất cả khách hàng
*/
const findAll = async () => {
const customers = await Customer.find();
return customers;
}

/**
* Lấy thông tin khách hàng bằng ID
*/
const findById = async (id: string) => {
const customer = await Customer.findById(id);
if (!customer) {
throw createError(404, 'Customer not found');
}
return customer;
}

/**
* Tạo khách hàng mới
*/
const create = async (payload: ICustomer) => {
const customer = await Customer.create(payload);
return customer;
}

/**
* Cập nhật thông tin khách hàng bằng ID
*/
const updateById = async (id: string, payload: ICustomer) => {
const customer = await findById(id);
Object.assign(customer, payload);
await customer.save();
return customer;
}

/**
* Xóa khách hàng bằng ID
*/
const deleteById = async (id: string) => {
const customer = await findById(id);
await customer.deleteOne({ _id: customer._id });
return customer;
}

export default {
findAll,
findById,
create,
updateById,
deleteById,
};