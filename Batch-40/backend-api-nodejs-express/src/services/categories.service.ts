import createError from 'http-errors';
/**
 * Service
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu return về controller
 */
const categories = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    }
]

const getAll = ()=>{
    return categories;
}

const getById = (id: number)=>{
    const category = categories.find(category => category.id == Number(id));
    //Nếu không tìm thấy category thì trả về lỗi 404
    if(!category){
        //throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    return category;
}

const create = (payload: {id: number, name: string})=>{
    categories.push(payload);
    //Trả về item vừa được tạo
    return payload;
}

const updateById = (id: number, payload)=>{
    const category = categories.find(category => category.id == Number(id));
    if(!category){
        throw createError(400, 'Category not found');
    }
    const index = categories.indexOf(category);
    categories[index] = payload;
    //return item vừa được update
    return categories[index];
}

const deleteById = (id: number)=>{
    const category = categories.find(category => category.id == Number(id));
    if(!category){
        throw createError(400, 'Category not found');
    }
    const index = categories.indexOf(category);
    categories.splice(index, 1);
    //return item vừa được xóa
    return category;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}