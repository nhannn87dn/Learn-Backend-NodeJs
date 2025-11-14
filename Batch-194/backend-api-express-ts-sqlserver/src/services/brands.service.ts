import createError from 'http-errors';
import {  ICategoryDTO } from "../types/categories";
import {myDataSource} from '../data-soucre';
import { Category } from '../entities/category.entity';

//Khởi tạo một repository cho entity Category
const categoryRepository = myDataSource.getRepository(Category);

const findAll = async()=>{
    //SELECT * FROM categories
    const categories = await categoryRepository.find();
    return categories;
}

const findById = async({id}: {id: string}) =>{
    //SELECT * FROM categories WHERE id = ?
    const category = await categoryRepository.findOneBy({id: parseInt(id)});
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!category) {
       throw createError(404, "Category not found")
    }
    return category
}


const create =async(categoryDto: ICategoryDTO)=>{
    const category = categoryRepository.create({
        category_name: categoryDto.category_name,
        description:  categoryDto.description ? categoryDto.description : '',
        slug: categoryDto.slug
    });
    const result = await categoryRepository.save(category);
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

    Object.assign(category, payload)

    //lưu lai
   const result =  await categoryRepository.save(category)

    //Lưu lại vào db
    //const result = await categoryRepository.update(category.id, payload);
    return result
}

const deleteById = async(id: string)=>{
    const category = await findById({id});
    if(!category){
        throw createError(404, "Category not found")
    }
    //step2: Xoa neu co ton tai
    await categoryRepository.delete(category.id);
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