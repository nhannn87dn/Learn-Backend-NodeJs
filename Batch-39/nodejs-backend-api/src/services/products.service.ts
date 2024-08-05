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


  /* Sắp xếp */
  let objSort: any = {};
  const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == 'ASC' ? 1: -1
  objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

  const offset = (page - 1) * limit;

  console.log('Product S',offset, limit);

  //Đếm tổng số record hiện có của collection Product
  const totalRecords = await Product.countDocuments();

  /* Select * FROM product */
  const products = await Product
  .find(objectFilters)
  .sort(objSort)
  .skip(offset)
  .limit(limit);

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

export default {
  findAll
}