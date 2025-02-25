import createError from 'http-errors';
import Staff from '../models/staff.model';

const getAll = async (query: any) => {

  const { page = 1, limit = 10 } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    const sortType = query.sort_type || 'desc';
    const sortBy = query.sort_by || 'createdAt';
    sortObject = { ...sortObject, [sortBy]: sortType === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>',sortObject);

    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.staff_name && query.staff_name.length > 0) {
        where = { ...where, staff_name: { $regex: query.staff_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.staff && query.staff.length > 0) {
        where = { ...where, staff: query.staff };
    }

  const staffs = await Staff
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});

  //Đếm tổng số record hiện có của collection Staff
  const count = await Staff.countDocuments(where);
  
  return {
    staffs,
    pagination:{
        totalRecord: count,
        limit,
        page
    }
  };
};

const getById = async(id: string) => {
    const staff = await Staff.findById(id);
    if (!staff) {
        throw createError(400, 'Staff not found');
    }
    return staff;
}
const create = async(payload: any) => {
    //Kiểm tra email có tồn tại không
    const staffExist = await Staff.findOne({
        email: payload.email
    })
    if (staffExist) {
        throw createError(400, 'Email already exists');
    }
   
    console.log('<<=== 🚀 payload ===>>',payload);
    const staff = new Staff(payload);
    await staff.save();
    return staff;
}

const updateById = async(id: string, payload: any) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const staff = await getById(id);

    //kiểm tra email có tồn tại không
    const staffExist = await Staff.findOne({
        email: payload.email,
        _id: { $ne: id }
    })
    if (staffExist) {
        throw createError(400, 'Email already exists');
    }

    Object.assign(staff, payload); //trộn dữ liệu cũ và mới
    await staff.save();
    return staff;
}

const deleteById = async(id: string) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const staff = await getById(id);
    //xóa sản phẩm
    await Staff.deleteOne({ _id: staff._id });
    return staff;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}