import createError from 'http-errors';
import Product from "../models/products.model";
import {TfindAllProduct} from '../types/models'
/* get All Products */

const findAll = async (query: any)=>{
  /* Phân trang */
  const page_str = query.page;
  const limit_str = query.limit;

  const page = page_str ? parseInt(page_str as string): 1;
  const limit = limit_str ? parseInt(limit_str as string): 10;

  /* Lọc theo từng điều kiện */
  let objectFilters : any = {};
  // Lọc theo danh mục sản phẩm
  if(query.category && query.category != ''){
    objectFilters = {...objectFilters, category: query.category}
  }
  // Lọc theo danh tên sản phẩm
  if(query.keyword && query.keyword != ''){
    objectFilters = {...objectFilters, product_name: new RegExp(query.keyword, 'i')}
  }



  /* Sắp xếp */
  let objSort: any = {};
  const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == 'ASC' ? 1: -1
  objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

  const offset = (page - 1) * limit;

  console.log('Product S',offset, limit);

  //Đếm tổng số record hiện có của collection Product
  const totalRecords = await Product.countDocuments(objectFilters);

  /* Select * FROM product */
  const products = await Product
  .find({
    ...objectFilters,
    //isDelete: false // Chỉ lấy những sp chưa xóa
  })
  .select('-__v -id')
  .populate('category', 'category_name')
  .populate('brand', 'brand_name')
  .sort(objSort)
  .skip(offset)
  .limit(limit)
  .lean({virtuals: true})
  ;

  return {
    products_list: products,
    sorts: objSort,
    filters: objectFilters,
    // Phân trang
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit), //tổng số trang
      totalRecords
    }
  }
}

/***
 * get Single Product
 */

const findOne =  async(id: string)=>{
  const product = await Product
  .findById(id, '-__v -id') // có thể liệt kê select vào tham số thứ 2 của hàm
  .populate('category', 'category_name')
  .populate('brand', 'brand_name')

  //Check sự tồn tại
  if(!product){
    throw createError(400, 'Product not found')
  }

  return product
}

/***
 * create new Product
 */

const createDocument = async (body: any)=>{
    const payloads = {
      product_name: body.product_name,
      price:body.price,
      discount: body.discount,
      category: body.category, 
      brandId: body.brandId, 
      model_year:body.model_year, 
      description:body.description, 
      thumbnail:body.thumbnail, 
      stock:body.stock, 
      slug:body.slug
    }
      const product = await Product.create(payloads)
      return product
}


/***
 * update a Product
 */

const updateById = async (id: string, payload: any)=>{
  //b1. Kiểm tính tồn tại
   const product = await findOne(id);
  //2. Update = cách ghi đè thuộc tính
  Object.assign(product, payload);
  await product.save();
  
  //3. Trả về kết quả
  return product
}

const deleteById = async (id: string)=>{
  //b1. Kiểm tính tồn tại
   const product = await findOne(id);
  //2. xóa
  await Product.deleteOne({ _id: product._id });

  //3. Trả về kết quả
  return product
}


export default {
  findAll,
  findOne,
  createDocument,
  updateById,
  deleteById
}