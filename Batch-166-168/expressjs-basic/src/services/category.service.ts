import createError from "http-errors";
import Category from "../models/category.model";
;

/* get ALl categories */
const findAll = async () => {
  //Lay du lieu trong DB
  // return lai cho controller
  const result = await Category.find();
  return result;
};

/* get Single Category */
const findOne = async (id: string) => {
  const category = await Category.findById(id);
  if(!category){
    throw createError(400, "Category not found")
  }
  return category;
};

/* create a new category */
const create = async (payload: any) => {
  console.log("<<=== 🚀 payload ===>>", payload);
  const category = await Category.create(payload);
  return category;
};

/* update a category */
const updateById =async (id: string, payload: any) => {
  //kiem tra su ton tai
  const category = await findOne(id);
    Object.assign(category, payload);
    await category.save();
  
  return category;
};

/* delete a category */
const deleteById = async(id: string) => {
  //kiem tra su ton tai
  const category = await findOne(id);

  await Category.findByIdAndDelete(id);
  return category;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};
