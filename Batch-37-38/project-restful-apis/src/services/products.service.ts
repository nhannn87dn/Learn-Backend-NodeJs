import createError from 'http-errors';
import Product from '../models/product.model';
import { IProduct } from '../types/models';


//Tra lai ket qua
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'sort'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}


    //Điều kiện where
    let findFilters : any = {};
    let objectFilters : any = {}
    //Tìm theo tên
    if(query && query.keyword && query.keyword !== ''){
        findFilters = {...findFilters, keyword: query.keyword}
        objectFilters = {...objectFilters, productName: new RegExp(query.keyword, 'i')}
    }
    //TH chỉ lọc theo giá thấp nhất
    if(query && query.price_min && query.price_min !== '' && !query.price_max){
        findFilters = {...findFilters, price_min: query.price_min}
        objectFilters = {...objectFilters, price: {$gte: query.price_min}}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }
    //TH chỉ lọc theo giá cao nhất
    if(query && query.price_max && query.price_max !== '' && !query.price_min){
        findFilters = {...findFilters, price_max: query.price_max}
        objectFilters = {...objectFilters, price: {$lte: query.price_max}}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }
    //TH chỉ lọc theo khoảng giá
    if(query 
        && query.price_min && query.price_min !== '' 
        && query.price_max && query.price_max !== ''){
            objectFilters = {...objectFilters, price: {
            $gte: query.price_min,
            $lte: query.price_max
        }}
        findFilters = {...findFilters, price_min: query.price_min, price_max: query.price_max}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }

    //Lọc theo danh mục
    if(query && query.cat_id && query.cat_id !== ''){
        findFilters = {...findFilters, category: query.cat_id}
        objectFilters = {...objectFilters, category: query.cat_id}
    }
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Product.countDocuments(objectFilters);

    //Lấy danh sách khớp với điều kiện cần lấy
    const products = await Product
    .find({
        ...objectFilters,
        isDelete: false //Điều kiện này cho frondend User
    })
    .select('-__v')
    .populate('category', '-__v -sort -isActive -createdAt -updatedAt')
    .populate('brand', '-__v -sort -isActive -createdAt -updatedAt')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = products.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        findFilters,
        sortBy: sortObject,
        products: products
      }
}
//Dùng cho client
const getAllClient = async (query: any)=>{
    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'sort'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}


    //Điều kiện where
    let findFilters : any = {};
    let objectFilters : any = {}
    //Tìm theo tên
    if(query && query.keyword && query.keyword !== ''){
        findFilters = {...findFilters, keyword: query.keyword}
        objectFilters = {...objectFilters, productName: new RegExp(query.keyword, 'i')}
    }
    //TH chỉ lọc theo giá thấp nhất
    if(query && query.price_min && query.price_min !== '' && !query.price_max){
        findFilters = {...findFilters, price_min: query.price_min}
        objectFilters = {...objectFilters, price: {$gte: query.price_min}}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }
    //TH chỉ lọc theo giá cao nhất
    if(query && query.price_max && query.price_max !== '' && !query.price_min){
        findFilters = {...findFilters, price_max: query.price_max}
        objectFilters = {...objectFilters, price: {$lte: query.price_max}}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }
    //TH chỉ lọc theo khoảng giá
    if(query 
        && query.price_min && query.price_min !== '' 
        && query.price_max && query.price_max !== ''){
            objectFilters = {...objectFilters, price: {
            $gte: query.price_min,
            $lte: query.price_max
        }}
        findFilters = {...findFilters, price_min: query.price_min, price_max: query.price_max}
        //mặc định sắp xếp giá tăng dần khi lọc theo giá
        sortObject = {price: 1}
    }

    //Lọc theo danh mục
    if(query && query.cat_id && query.cat_id !== ''){
        findFilters = {...findFilters, category: query.cat_id}
        objectFilters = {...objectFilters, category: query.cat_id}
    }

    //Chỉ lấy những sp isActive=true, isDelete =false
    objectFilters = {
        ...objectFilters, 
        isActive: true,
        isDelete: false
    }
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Product.countDocuments(objectFilters);

    //Lấy danh sách khớp với điều kiện cần lấy
    const products = await Product
    .find({
        ...objectFilters,
        isDelete: false //Điều kiện này cho frondend User
    })
    .select('-__v')
    .populate('category', '-__v -sort -isActive -createdAt -updatedAt')
    .populate('brand', '-__v -sort -isActive -createdAt -updatedAt')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = products.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        findFilters,
        sortBy: sortObject,
        products: products
      }
}

const getProductById  = async (id:string)=>{
    //SELECT * FROM products WHERE _id = id
    const result = await Product
    .findById(id)
    .select('-__v')
    // .populate('category', '-__v')
    // .populate('brand', '-__v')

    if(!result){
        throw createError(404,'Product not found');
    }
    return result;
}

const getProductBySlug  = async (slug:string)=>{
    //SELECT * FROM products WHERE slug = slug
    const result = await Product
    .findOne({
        slug: slug
    })
    .select('-__v')
    // .populate('category', '-__v')
    // .populate('brand', '-__v')

    console.log('<<=== 🚀 slug ===>>',slug, result);

    if(!result){
        throw createError(404,'Product not found');
    }
    return result;
}


const createProduct = async (data: IProduct)=>{
    
    /**
     * Để tránh Rác hình ảnh
     * Thêm mới sản phẩm trước, nếu thành công thì mới đi upload hình ảnh.
     */
    const result = await Product.create(data);
    return result;
}

const updateProduct = async (id: string,data: IProduct)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getProductById(id);
    console.log('update product', data);
    

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(product, data);
    await product.save();
    return product
}

const deleteProduct = async (id:string)=>{
   
    //const product = await Product.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getProductById(id);
    await Product.deleteOne({ _id: product._id });
    return product
}

export default {
    getAll,
    getAllClient,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
}