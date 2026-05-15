import createError from "http-errors";
import Category from "../models/Category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category.type";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng cho Category,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

/**
 * @desc Get all list Categories
 * @route GET /api/v1/categories
 * @returns Promise<Array<Object>>
 */
const findAll = async () => {
  const data = await Category.find();
  return data;
};

/**
 * @desc Get Category by ID or throw error
 * @param id string
 * @returns Category
 */
const getByIdOrFail = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw createError(404, 'Category not found');
  }
  return category;
};

/**
 * @desc Create a new category
 * @param createCategoryDto CreateCategoryDto
 * @returns Category
 */
const create = async (createCategoryDto: CreateCategoryDto) => {
  const newCategory = await Category.create({
    category_name: createCategoryDto.category_name,
    description: createCategoryDto.description,
    slug: createCategoryDto.slug,
  });
  return newCategory;
};

/**
 * @desc Update a category by ID
 * @param id string
 * @param updateCategoryDto UpdateCategoryDto
 * @returns Category
 */
const updateById = async (id: string, updateCategoryDto: UpdateCategoryDto) => {
  // step 1: check if category exists
  const category = await getByIdOrFail(id);

  // step 2: update fields if they are provided
  if (updateCategoryDto.category_name !== undefined) {
    category.category_name = updateCategoryDto.category_name;
  }
  if (updateCategoryDto.description !== undefined) {
    category.description = updateCategoryDto.description;
  }
  if (updateCategoryDto.slug !== undefined) {
    category.slug = updateCategoryDto.slug;
  }

  await category.save();
  return category;
};

/**
 * @desc Delete a category by ID
 * @param id string
 * @returns Category
 */
const deleteById = async (id: string) => {
  // step 1: check if category exists
  const category = await getByIdOrFail(id);
  // step 2: remove it
  await Category.deleteOne({ _id: category._id });
  return category;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};