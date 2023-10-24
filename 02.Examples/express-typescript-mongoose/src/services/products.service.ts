import createError from 'http-errors';
import Product from '../models/Product.model';
import { IProduct } from "../types/models";

/**
* Lấy tất cả sản phẩm
*/
const findAll = async (page: number, limit: number) => {
  const products = await Product.find().
  select('-__v').
  skip((page - 1) * limit).
  limit(limit);

  /// get total documents in the Products collection 
  const totalRecords = await Product.count();

  //return response with Products, total pages, and current page
  return {
    products,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit
  };
}

/**
* Lấy thông tin sản phẩm bằng ID
*/
const findById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
  throw createError(404, 'Product not found');
  }
  return product;
}

/**
* Tạo sản phẩm mới
*/
const create = async (payload: IProduct) => {
  const product = await Product.create(payload);
  return product;
}

/**
* Cập nhật thông tin sản phẩm bằng ID
*/
const updateById = async (id: string, payload: IProduct) => {
  const product = await findById(id);
  Object.assign(product, payload);
  await product.save();
  return product;
}

/**
* Xóa sản phẩm bằng ID
*/
const deleteById = async (id: string) => {
  const product = await findById(id);
  await product.deleteOne({ _id: product._id });
  return product;
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};