import createError from 'http-errors';
import Category from '../models/category.model';
import { ICategory } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Category.find();
    return result
}

const getCategoryById  = async (id:string)=>{
    //SELECT * FROM categorys WHERE _id = id
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
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await getCategoryById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(category, data);
    await category.save();

    return category
}

const deleteCategory = async (id:string)=>{
   
    //const category = await Category.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await getCategoryById(id);
    await Category.deleteOne({ _id: category._id });
    return category
}

export default {
    getAll,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}