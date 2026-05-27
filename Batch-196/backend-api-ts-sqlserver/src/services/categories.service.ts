import createError from "http-errors";
import {Category} from '../entities/Category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category.type";
import {myDataSource} from '../dataSource';

//khởi tạo repository cho entity Category
const categoryRepository = myDataSource.getRepository(Category);

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
  const data = await categoryRepository.find();
  return data;
};

/**
 * @desc Get Category by ID or throw error
 * @param id string
 * @returns Category
 */
const getByIdOrFail = async (id: number) => {
  const category = await categoryRepository.findOne({
    where: { id },
  });
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
  const newCategory =  categoryRepository.create({
    categoryName: createCategoryDto.categoryName,
    description: createCategoryDto.description,
    slug: createCategoryDto.slug,
  });

  return await categoryRepository.save(newCategory);
};

/**
 * @desc Update a category by ID
 * @param id string
 * @param updateCategoryDto UpdateCategoryDto
 * @returns Category
 */
const updateById = async (id: number, updateCategoryDto: UpdateCategoryDto) => {
  // step 1: check if category exists
  const category = await getByIdOrFail(id);

  // step 2: update fields if they are provided
  if (updateCategoryDto.categoryName !== undefined) {
    category.categoryName = updateCategoryDto.categoryName;
  }
  if (updateCategoryDto.description !== undefined) {
    category.description = updateCategoryDto.description;
  }
  if (updateCategoryDto.slug !== undefined) {
    category.slug = updateCategoryDto.slug;
  }

  return await categoryRepository.save(category);
};

/**
 * @desc Delete a category by ID
 * @param id string
 * @returns Category
 */
const deleteById = async (id: number) => {
  // step 1: check if category exists
  const category = await getByIdOrFail(id);
  // step 2: remove it
  await categoryRepository.remove(category);
  return category;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};