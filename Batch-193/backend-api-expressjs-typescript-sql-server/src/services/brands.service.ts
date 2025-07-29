
import createError from "http-errors";
import { brandRepository } from "../repositories/brand.repository";


const findAll = async () => {
  return await brandRepository.find();
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
