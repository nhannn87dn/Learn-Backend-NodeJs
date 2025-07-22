
import createError from "http-errors";
import Brand from "../models/Brand.model";


const findAll = async () => {
  const brandsDB = await Brand.find();
  return brandsDB;
};


const findById = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    throw createError(404, "Brand not found");
  }
  return brand;
};


const create = (payload: any) => {
  const newBrand = new Brand({
    brand_name: payload.brand_name,
    description: payload.description,
    slug: payload.slug,
  });
  newBrand.save();
  return newBrand;
};


const updateById = async (id: string, payload: any) => {
  const brand = await findById(id);
  Object.assign(brand, payload);
  await brand.save();
  return brand;
};


const deleteById = async (id: string) => {
  const brand = await findById(id);
  await Brand.findByIdAndDelete(brand._id);
  return brand;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
