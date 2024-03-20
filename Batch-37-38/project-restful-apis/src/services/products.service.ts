import createError from 'http-errors';
import Product from '../models/product.model';
import { IProduct } from '../types/models';


//Tra lai ket qua
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Điều kiện where
    let findFilters : any = {};
    let objectFilters : any = {}
    //Tìm theo tên
    if(query.keyword && query.keyword !== ''){
        findFilters = {...findFilters, keyword: query.keyword}
        objectFilters = {...objectFilters, productName: new RegExp(query.keyword, 'i')}
    }
    //Loc theo khoang gia 500 - 2000
    
    console.log(findFilters);
    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query.sortBy ? query.sortBy : 'sort'
    const sortType = query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Product.countDocuments(objectFilters);

    //Lấy danh sách khớp với điều kiện cần lấy
    const products = await Product
    .find(objectFilters)
    .select('-__v')
    .populate('category', '-__v')
    .populate('brand', '-__v')
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
    .populate('category', '-__v')
    .populate('brand', '-__v')

    if(!result){
        throw createError(404,'Product not found');
    }
    return result;
}

const createProduct = async (data: IProduct)=>{
    const result = await Product.create(data)
    return result;
}

const updateProduct = async (id: string,data: IProduct)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getProductById(id);

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
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}