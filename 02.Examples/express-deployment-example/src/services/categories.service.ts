import createError from 'http-errors';
import Category from '../models/category.model';
import { ICategory } from '../types/models';
import redisService from './redis.service';

const CACHE_TTL = 30; // 1 hour cache
const CACHE_KEY_ALL = 'categories:all';
const CACHE_KEY_PREFIX = 'category:';

//Tra lai ket qua
const getAll = async (query: any)=>{
    // Try to get from cache first
    const cacheKey =  await redisService.buildCacheKey(CACHE_KEY_ALL, query);
    const cachedData = await redisService.get(cacheKey);

    console.log('<<=== 🚀 cacheKey ===>>', cacheKey);
    console.log('<<=== 🚀 cachedData ===>>', cachedData);
    
    if (cachedData) {
        console.log('Fetching categories from cache');
        return JSON.parse(cachedData);
    }
    //Phân trang
    const currentPage = query && query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query && query.sortBy ? query.sortBy : 'sort'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Category.countDocuments();

    //Lấy danh sách khớp với điều kiện cần lấy
    const categories = await Category
    .find({})
    .select('-__v')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = categories.length;

    const result = {
        metadata: {
            limit: pageSize,// số lượng item trên 1 trang
            page: currentPage, //trang hiện tại
            totalPages: Math.ceil(count / pageSize), //tổng số trang
            totalItems: count, //tổng số records
            filteredCount, //số record khớp điều kiện
            sortBy: sortObject
        },
        categories: categories
    };

    // Save to cache
    await redisService.set(cacheKey, JSON.stringify(result), 30);
    console.log('Fetching categories from DB and caching to Redis');
    return result;
}

const getCategoryById = async (id:string)=>{
    // Try to get from cache first
    const cacheKey = `${CACHE_KEY_PREFIX}${id}`;
    const cachedData = await redisService.get(cacheKey);
    
    if (cachedData) {
        console.log('Fetching category from cache');
        return JSON.parse(cachedData);
    }

    //SELECT * FROM categorys WHERE _id = id
    const result = await Category.findById(id);

    if(!result){
        throw createError(404,'Category not found');
    }

    // Save to cache
    await redisService.set(cacheKey, JSON.stringify(result), CACHE_TTL);
    console.log('Fetching category from DB and caching to Redis');
    return result;
}

const createCategory = async (data: ICategory)=>{
    const result = await Category.create(data);
    
    // Invalidate the categories list cache by deleting the pattern
    await redisService.del(`${CACHE_KEY_ALL}:*`);
    
    return result;
}

const updateCategory = async (id: string,data: ICategory)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await Category.findById(id);

    console.log('updateCategory',category);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(category, data);
    await category.save();

    // Invalidate both category detail and list caches
    await redisService.del(`${CACHE_KEY_PREFIX}${id}`);
    await redisService.del(`${CACHE_KEY_ALL}:*`);

    return category
}

const deleteCategory = async (id:string)=>{
   
    //const category = await Category.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await getCategoryById(id);
    await Category.deleteOne({ _id: category._id });

    // Invalidate both category detail and list caches
    await redisService.del(`${CACHE_KEY_PREFIX}${id}`);
    await redisService.del(`${CACHE_KEY_ALL}:*`);

    return category
}

export default {
    getAll,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}