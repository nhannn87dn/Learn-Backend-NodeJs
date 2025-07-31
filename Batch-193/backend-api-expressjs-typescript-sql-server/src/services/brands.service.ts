import createError from "http-errors";
import { brandRepository } from "../repositories/brand.repository";

const findAll = async () => {
  const brands = await brandRepository.find();
  return brands;
};

const findById = async (id: number) => {
  const brand = await brandRepository.findOne({
    where: {
      id
    }
  });
  if (!brand) {
    throw createError(400, "Brand not found");
  }
  return brand;
};

const create = async (payload: any) => {
  const brand = brandRepository.create(payload);
  await brandRepository.save(brand);
  return brand;
};

const updateById = async (id: number, payload: any) => {
  // Check existence
  const brand = await findById(id);
  // Merge with payload
  Object.assign(brand, payload);
  // Save changes
  const result = await brandRepository.save(brand);
  return result;
};

const deleteById = async (id: number) => {
  // Check existence
  const brand = await findById(id);
  const result = await brandRepository.delete(id);
  console.log('<<=== 🚀 result ===>>', result);
  return brand; // Return the deleted brand for response usage
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};