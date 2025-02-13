import createError from 'http-errors';
/**
 * Service
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu return về controller
 */
const brands = [
    {
        id: 1,
        name: 'Brand 1'
    },
    {
        id: 2,
        name: 'Brand 2'
    }
]

const getAll = ()=>{
    return brands;
}

const getById = (id: number)=>{
    const brand = brands.find(brand => brand.id == Number(id));
    //Nếu không tìm thấy brand thì trả về lỗi 404
    if(!brand){
        //throw new Error('Brand not found');
        throw createError(400, 'Brand not found');
    }
    return brand;
}

const create = (payload: {id: number, name: string})=>{
    brands.push(payload);
    //Trả về item vừa được tạo
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string})=>{
    const brand = brands.find(brand => brand.id == Number(id));
    if(!brand){
        throw createError(400, 'Brand not found');
    }
    const index = brands.indexOf(brand);
    brands[index] = payload;
    //return item vừa được update
    return brands[index];
}

const deleteById = (id: number)=>{
    const brand = brands.find(brand => brand.id == Number(id));
    if(!brand){
        throw createError(400, 'Brand not found');
    }
    const index = brands.indexOf(brand);
    brands.splice(index, 1);
    //return item vừa được xóa
    return brand;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}