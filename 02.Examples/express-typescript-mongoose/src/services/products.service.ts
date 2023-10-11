import createError from 'http-errors';
import Product from '../models/Product.model';
import { IProduct } from "../types/models";

/**
* Lấy tất cả khách hàng
*/
const findAll = async () => {
const products = await Product.find();
return products;
}

/**
* Lấy thông tin khách hàng bằng ID
*/
const findById = async (id: string) => {
const customer = await Product.findById(id);
if (!customer) {
throw createError(404, 'Product not found');
}
return customer;
}

/**
* Tạo khách hàng mới
*/
const create = async (payload: IProduct) => {
const customer = await Product.create(payload);
return customer;
}

/**
* Cập nhật thông tin khách hàng bằng ID
*/
const updateById = async (id: string, payload: IProduct) => {
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