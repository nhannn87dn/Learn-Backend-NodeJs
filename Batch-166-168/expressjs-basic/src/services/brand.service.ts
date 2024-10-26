import createError from "http-errors";
import Brand from "../models/brand.model";

/* get ALl brands */
const findAll = async () => {
  //Lay du lieu trong DB
  // return lai cho controller
  const result = await Brand.find();
  return result;
};

/* get Single Brand */
const findOne = async (id: string) => {
  const brand = await Brand.findById(id);
  /* check su ton tai cua brand */
  if (!brand) {
    throw createError(400, "Brand not found", { data: brand });
  }
  return brand;
};

/* create a new brand */
const create = async (payload: any) => {
  console.log("<<=== 🚀 payload ===>>", payload);
  const brand = await Brand.create(payload);
  return brand;
};

/* update a brand */
const updateById = async (id: string, payload: any) => {
  //kiem tra su ton tai
  const brand = await findOne(id);

 
  return brand;
};

/* delete a brand */
const deleteById = async(id: string) => {
  //kiem tra su ton tai
  const brand = await findOne(id);

  return brand;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};
