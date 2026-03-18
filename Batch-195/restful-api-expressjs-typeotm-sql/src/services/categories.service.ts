import { ICategoryDTO } from "../types/category.type";
import createError from 'http-errors';
import { Category } from "../entities/category.entity";
import { myDataSource } from "../data-soucre";

//tạo một repository để thao tác với bảng categories trong database
const categoryRepository = myDataSource.getRepository(Category);


const getAllCategories = async () => {
    const categories = await categoryRepository.find();
    return categories;
}

const getCategoryById = async (id: string) => {
   return null;
}

const createCategory = async (payload: ICategoryDTO) => {
    const category = categoryRepository.create({
    category_name: payload.category_name,
    description: payload.description ? payload.description : '',
    slug: payload.slug,
    });
    return await categoryRepository.save(category);
}

const updateCategoryById = async (id: string, payload: ICategoryDTO) => {
   return null;
}

const deleteCategoryById = async (id: string) => {
    return null
}

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
}
