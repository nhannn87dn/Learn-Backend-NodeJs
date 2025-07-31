import createError from "http-errors";
import { productRepository } from "../repositories/product.repository";

const findAll = async (query: any) => {
  
  return await productRepository.find()
};

const findById = async (id: string) => {
  
  return [];
};

const create = (payload: any) => {
  
  return [];
};

const updateById = async (id: string, payload: any) => {
 return [];
};

const deleteById = async (id: string) => {
  return [];
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
