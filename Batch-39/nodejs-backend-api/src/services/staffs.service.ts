import createError from 'http-errors';
import Staff from "../models/staffs.model";
/* get All Staffs */

const findAll = async (query: any)=>{
  /* Phân trang */
  const page_str = query.page;
  const limit_str = query.limit;

  const page = page_str ? parseInt(page_str as string): 1;
  const limit = limit_str ? parseInt(limit_str as string): 10;

  /* Lọc theo từng điều kiện */
  let objectFilters : any = {};
  
  // Lọc theo danh tên sản phẩm
  if(query.keyword && query.keyword != ''){
    objectFilters = {...objectFilters, staff_name: new RegExp(query.keyword, 'i')}
  }

  /* Sắp xếp */
  let objSort: any = {};
  const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == 'ASC' ? 1: -1
  objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

  const offset = (page - 1) * limit;

  console.log('Staff S',offset, limit);

  //Đếm tổng số record hiện có của collection Staff
  const totalRecords = await Staff.countDocuments();

  /* Select * FROM staff */
  const staffs = await Staff
  .find({
    ...objectFilters,
    //isDelete: false // Chỉ lấy những sp chưa xóa
  })
  .select('-__v -id')
  .sort(objSort)
  .skip(offset)
  .limit(limit);

  return {
    staffs_list: staffs,
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
 * get Single Staff
 */

const findById =  async(id: string)=>{
  const staff = await Staff
  .findById(id, '-__v -id') // có thể liệt kê select vào tham số thứ 2 của hàm

  //Check sự tồn tại
  if(!staff){
    throw createError(400, 'Staff not found')
  }

  return staff
}

/***
 * create new Staff
 */

const createDocument = async (body: any)=>{
    const payloads = {
      staff_name: body.staff_name,
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
      const staff = await Staff.create(payloads)
      return staff
}


/***
 * update a Staff
 */

const updateById = async (id: string, payload: any)=>{
  //b1. Kiểm tính tồn tại
   const staff = await findById(id);
  //2. Update = cách ghi đè thuộc tính
  Object.assign(staff, payload);
  await staff.save();
  
  //3. Trả về kết quả
  return staff
}

const deleteById = async (id: string)=>{
  //b1. Kiểm tính tồn tại
   const staff = await findById(id);
  //2. xóa
  await Staff.deleteOne({ _id: staff._id });

  //3. Trả về kết quả
  return staff
}


export default {
  findAll,
  findById,
  createDocument,
  updateById,
  deleteById
}