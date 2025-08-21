import createError from "http-errors";
import Category from "../models/Category.model";

const getCategoryTree = async()=>{
  const categoriesDB =  await Category
  .find()
  .select("_id category_name slug");
  return categoriesDB;
}

const findAll = async () => {
  //buộc phải có return
  const categoriesDB =  await Category.find();
  //console.log('<<=== 🚀  categoriesDB===>>',categoriesDB);
  return categoriesDB;
};
 
const findById = async (id: string) => {
  //const category = categories.find((cat) => cat.id === id);
  const category = await Category.findById(id);
  if (!category) {
    throw createError(400, "Category not found");
  }
  return category;
};

const create = (payload: ICategoryDTO) => {
  // const newCategory = {
  //   id: categories.length + 1,
  //   name: payload.name,
  // };
  // categories.push(newCategory);
  const newCategory = new Category({
    category_name: payload.category_name,
    description: payload.description,
    slug: payload.slug,
  });
  newCategory.save();

  return newCategory;
};

const updateById = async (id: string, payload: ICategoryDTO) => {
  //step1: check id tồn tại không
  const category = await findById(id);

  //step2: cập nhật category
  // await Category.updateOne({ _id: id }, 
  //   {
  //     category_name: payload.category_name,
  //     description: payload.description,
  //     slug: payload.slug,
  // })

  //Tận dụng kết nối từ hàm findById
  Object.assign(category, payload);
  await category.save();

  return category;
};

const deleteById = async (id: string) => {
  // const categoryIndex = categories.findIndex((cat) => cat.id ===id);

  // if (categoryIndex === -1) {
  //   throw createError(400, "Category not found");
  // }
  // categories.splice(categoryIndex, 1);
  //step1: check id tồn tại không
  const category = await findById(id);
  //step2: xóa category
  await Category.findByIdAndDelete(category._id);
  return category; //return về category đã xóa để có thể sử dụng trong response
  
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  getCategoryTree
};
