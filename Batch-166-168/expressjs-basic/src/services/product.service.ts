import createError from "http-errors";
import Product from "../models/product.model";

/*
Select All products
*/
const findAll = async (query: any) => {
    console.log('<<=== 🚀 query ===>>',query);

    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 10; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'createdAt'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}


   //Điều kiện where
   let findFilters : any = {};
   let objectFilters : any = {}
   //Tìm theo tên
   if(query && query.keyword && query.keyword !== ''){
       findFilters = {...findFilters, keyword: query.keyword}
       objectFilters = {...objectFilters, product_name: new RegExp(query.keyword, 'i')}
   }

   //Lọc theo danh mục
   if(query && query.cat_id && query.cat_id !== ''){
        findFilters = {...findFilters, category: query.cat_id}
        objectFilters = {...objectFilters, category: query.cat_id}
    }
    
    //Đếm tổng số san pham khop dieu kien lay
    const count = await Product.countDocuments({
        ...objectFilters
    });

    //Danh sach san pham khop dieu kien lay
    const products = await Product
    .find({
        ...objectFilters
    })
    .select('-__v')
    .populate('category', '_id category_name slug')
    .populate('brand', '_id brand_name slug')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

    return {
        products,
        query: query,
        pagination: {
            page: currentPage,
            limit: pageSize,
            totalRecords: count,
            totalPages: Math.ceil(count / pageSize), //tổng số trang
        }
    };
};

const findOne = async(id: string)=>{
    const product = await Product.findById(id);
    if(!product){
        throw createError(400, "Product not found")
    }
    return product;
}

const create = async (body: any)=>{
    //check xem body.category co ton tai chua
    //check xem body.brand co ton tai chua
    const product = await Product.create(body);
    return product
}

const updateById = async(id: string, payload: any)=>{
    //b1 check su ton tai cua id trong csdl
    const product = await findOne(id);
    //b2 update
    //const result = await Product.findByIdAndUpdate(id, payload);
    //merge 2 data voi nhau de cap nhat
    Object.assign(product, payload);
    await product.save();

    return product
}

const deleteById = async(id: string)=>{
    //b1 check su ton tai cua id trong csdl
    const product = await findOne(id);
    //b2 delete
    await Product.findByIdAndDelete(id);
    //await product.remove()
    return product
}

export default {
    findAll,
    findOne,
    create,
    updateById,
    deleteById
}