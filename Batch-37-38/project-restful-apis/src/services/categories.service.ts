import createError from 'http-errors';
import Category from '../models/category.model';
import { ICategory } from '../types/models';
//Tra lai ket qua
const getAllProduct = async ()=>{
    const result = await Category.find();
    return result
}

const getCategoryById  = async (id:string)=>{
    //SELECT * FROM categories WHERE _id = id
    const result = await Category.findById(id);

    if(!result){
        throw createError(404,'Category not found');
    }
    return result;
}

const createCategory = async (data: ICategory)=>{
    const result = await Category.create(data)
    return result;
}

const updateCategory = async (id: string,data: ICategory)=>{
    //check xem id co ton tai khong
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
    });

    return category
}

const deleteCategory = async (id:string)=>{
   
    const category = await Category.findByIdAndDelete(id);
    return category
}

export default {
    getAllProduct,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}