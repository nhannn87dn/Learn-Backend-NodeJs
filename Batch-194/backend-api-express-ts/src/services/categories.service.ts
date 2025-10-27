import createError from 'http-errors';
import {  ICategoryDTO } from "../types/categories";
import Category from "../models/Category.model";

const findAll = async()=>{
    //SELECT * FROM categories
    const categories = await Category
    .find()
    .select('-__v'); //loại bỏ trường __v không cần thiết
    
    return categories;
}

const findById = async({id}: {id: string}) =>{
    //SELECT * FROM categories WHERE id = ?
    const category = await Category.findById(id);
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!category) {
       throw createError(404, "Category not found")
    }
    return category
}


const create =async(categoryDto: ICategoryDTO)=>{
   const category = new Category({
    category_name: categoryDto.category_name,
    description: categoryDto.description,
    slug: categoryDto.slug,
   });
   const result = await category.save();
    return result
}

const updateById =async({
    id,
    payload
}: {
    id: string,
    payload: Partial<ICategoryDTO>
})=>{
    //step1: Check xem trong db co ton tai record co id khong
    let category = await findById({id});
    if(!category){
        throw createError(404, "Category not found")
    }

    //Step 2: Xử lý update khi có thay đổi
    Object.assign(category, payload);//merge 2 object lại với nhau
    
    //Lưu lại vào db
    await category.save();
    return category
}

const deleteById = async(id: string)=>{
    const category = await findById({id});
    if(!category){
        throw createError(404, "Category not found")
    }
    //step2: Xoa neu co ton tai
    await Category.findByIdAndDelete(category._id);
    //Trả về category đã xóa
    return category;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}