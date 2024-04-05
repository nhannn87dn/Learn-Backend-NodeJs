import { TCategory } from "../types/entities";
import { myDataSource } from "../data-soucre"
import { Category } from "../entities/Category.entity"
import createError  from 'http-errors';

const categoryRepository = myDataSource.getRepository(Category)
//GetALL
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query && query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang


    const [categories, totalCount] = await categoryRepository.findAndCount({
        order: {
            id: "DESC",
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(totalCount / pageSize), //tổng số trang
        totalItems: totalCount, //tổng số records
        categories: categories
    }
}

//GetByID
const getById = async (id: number)=>{
    //findOneBy == return one record
    const result = await categoryRepository.findOneBy({
        id: id
    });
    if(!result){
        throw createError(404, 'Category not found');
    }
    return result
}
//Create
const create = async (payload: TCategory)=>{
    const record =  categoryRepository.create(payload)
    const result = await categoryRepository.save(record);
    return result
}

//Update By ID
const updateById = async(id: number, payload: TCategory)=>{
    //1. Check xem co ton tai id ko
    const category = await getById(id);
    //2. Merge category dang ton tai voi payload
    categoryRepository.merge(category, payload);
    const result = await categoryRepository.save(category);
    return result;
}

//Delete By ID
const deleteById = async(id: number)=>{
    //1. Check xem co ton tai id ko
    const category = await getById(id);
    //2. Di xoa record
    const result = await categoryRepository.remove(category);
    return result;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}