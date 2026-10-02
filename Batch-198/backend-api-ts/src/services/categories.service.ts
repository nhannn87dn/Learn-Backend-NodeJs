import Category from "../models/category.model";
import { CategoryCreateDTO } from "../types/category";
import createError from "http-errors";

// Lấy tất cả danh mục
const findAll = async () => {
    const categories = await Category.find();
    return categories;
}

// Lấy danh mục theo ID
const findById = async (id: string) => {
    const category = await Category.findById(id);
    if(!category) {
        // throw new Error("Category not found");
        throw createError(400, "Category not found");
    }
    return category;
}

// Tạo danh mục mới
const create = async (payload: CategoryCreateDTO) => {
    const newCategory = await Category.create(payload);
    return newCategory;
}

// Update danh mục theo ID
const updateById = async (id: string, payload: Partial<CategoryCreateDTO>) => {
    const category = await findById(id);
   
    // Update the category with the new data
    Object.assign(category, payload);
    // Save the updated category
    await category.save();
    return category;
}

//delete danh mục theo ID
const deleteById = async (id: string) => {
    const category = await findById(id);
    await Category.findByIdAndDelete(category._id);
    return category;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}