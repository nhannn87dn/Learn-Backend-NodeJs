import createError from "http-errors";
import { categories } from "../databases/db";

const findAll = () => {
  //buộc phải có return
  return categories;
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
