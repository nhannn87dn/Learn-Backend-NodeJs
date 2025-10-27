import { fake_categories } from "../mockup/mockData"
import createError from 'http-errors';
import { ICategory, ICategoryDTO } from "../types/categories";

const findAll = () : ICategory[]=>{
    return fake_categories
}

const findById = ({id}: {id: string}) : ICategory =>{
    const category = fake_categories.find((category) => category.id === parseInt(id));
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!category) {
       throw createError(404, "Category not found")
    }
    return category
}


const create =({name}: ICategoryDTO): ICategory=>{
    const newCategory = {
    id: fake_categories.length + 1,
    name,
    }
    fake_categories.push(newCategory)
    return newCategory
}

const updateById =({
    id,
    payload
}: {
    id: string,
    payload: Partial<ICategoryDTO>
}): ICategory=>{
    //step1: Check xem trong db co ton tai record co id khong
    let category = fake_categories.find(c => c.id === parseInt(id));
    if(!category){
        throw createError(404, "Category not found")
    }

    //Step 2: Xử lý khi có tồn tại
    if(payload.name)
    {
        category = {...category, name: payload.name}
    }
    return category
}

const deleteById = (id: string): ICategory=>{
    let category = fake_categories.find(c => c.id === parseInt(id));
    if(!category){
        throw createError(404, "Category not found")
    }
    //step2: Xoa neu co ton tai
    //const results = fake_categories.filter(c => c.id !== parseInt(id))
    return category
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}