import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { ICategory, ICategoryCreate, ICategoryUpdate } from '../types/category';

const CATEGORY_PATH = path.join(__dirname, '../databases/categories.json');

async function getAllCategories(): Promise<ICategory[]> {
  try {
    const data = await readFile(CATEGORY_PATH);
    console.log('<<=== 🚀 data ===>>',data);
    return Array.isArray(data) ? (data as ICategory[]) : [];
  } catch {
    return [];
  }
}

const findAll = async (query: any) => {
  let categories: ICategory[] = await getAllCategories();
  return {
    data: categories.slice((query.page - 1) * query.limit, query.page * query.limit), //return data with limit and page
    totalRecords: categories.length,
    page: query.page || 1,
    limit: query.limit || 10,
    totalPages: Math.ceil(categories.length / (query.limit || 10)),
  };
};

const findById = async (id: string) => {
  const categories = await getAllCategories();
  const category = categories.find((c: ICategory) => String(c.id) === String(id));
  if (!category) throw createError(404, "Category not found");
  return category;
};

const create = async (payload: ICategoryCreate) => {
  const categories = await getAllCategories();
  const newCategory: ICategory = {
    ...payload,
    id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
  };
  categories.push(newCategory);
  await writeFile(CATEGORY_PATH, categories);
  return newCategory;
};

const updateById = async (id: string, payload: ICategoryUpdate) => {
  const categories = await getAllCategories();
  const idx = categories.findIndex((c: ICategory) => String(c.id) === String(id));
  if (idx === -1) throw createError(404, "Category not found");
  categories[idx] = { ...categories[idx], ...payload };
  await writeFile(CATEGORY_PATH, categories);
  return categories[idx];
};

const deleteById = async (id: string) => {
  const categories = await getAllCategories();
  const idx = categories.findIndex((c: ICategory) => String(c.id) === String(id));
  if (idx === -1) throw createError(404, "Category not found");
  const deleted = categories.splice(idx, 1)[0];
  await writeFile(CATEGORY_PATH, categories);
  return deleted;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
