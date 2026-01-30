import { ICategoryDTO } from "../types/category.type";
import createError from 'http-errors';
import Category from "../models/category.model";

const getAllCategories = async () => {
    // get all categories from database
    const result = await Category.find();
    return result;
}

const getCategoryById = async (id: string) => {
    // SELECT * FROM categories WHERE id = id
    const category = await Category.findById(id);
    if (!category) {
        throw createError(404, 'Category not found');
    }
    return category;
}

const createCategory = async (payload: ICategoryDTO) => {
    // Implementation for creating a category
    const newCategory = {
        category_name: payload.category_name,
        description: payload.description,
        slug: payload.slug,
    };
    const category = new Category(newCategory);
    const result = await category.save(); // lưu vào database
    // trả về kết quả tạo mới
    return result;
}

const updateCategoryById = async (id: string, payload: ICategoryDTO) => {
    // Implementation for updating a category
    let category = await getCategoryById(id);
    Object.assign(category, {
        category_name: payload.category_name,
        description: payload.description,
        slug: payload.slug,
    });
    const result = await category.save();
    // trả về kết quả cập nhật
    return result;
}

const deleteCategoryById = async (id: string) => {
    // trả về kết quả sau khi xóa
    const category = await getCategoryById(id);
    const result = await Category.deleteOne({ _id: category._id });
    // trả về kết quả xóa
    return result;
}

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
}
