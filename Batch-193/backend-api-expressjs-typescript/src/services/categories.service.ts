import createError from "http-errors";
import { categories } from "../databases/db";
import Category from "../models/Category.model";

const findAll = async () => {
  //buộc phải có return
  const categoriesDB =  await Category.find();
  console.log('<<=== 🚀  categoriesDB===>>',categoriesDB);
  return categoriesDB;
};
 
const findById = (id: number) => {
  const category = categories.find((cat) => cat.id === id);
  if (!category) {
    throw createError(400, "Category not found");
  }
  return category;
};

const create = (payload: { name: string }) => {
  const newCategory = {
    id: categories.length + 1,
    name: payload.name,
  };
  categories.push(newCategory);
  return newCategory;
};

const updateById = (id: number, payload: { name: string }) => {
  const categoryIndex = categories.findIndex((cat) => cat.id === id);

  if (categoryIndex === -1) {
    throw createError(400, "Category not found");
  }
  categories[categoryIndex].name = payload.name;

  return categories[categoryIndex];
};

const deleteById = (id: number) => {
  const categoryIndex = categories.findIndex((cat) => cat.id ===id);

  if (categoryIndex === -1) {
    throw createError(400, "Category not found");
  }

  categories.splice(categoryIndex, 1);
  return categories
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
