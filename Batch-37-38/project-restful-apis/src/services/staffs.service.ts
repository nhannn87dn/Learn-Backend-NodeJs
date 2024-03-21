import createError from 'http-errors';
import Staff from '../models/staff.model';
import { IStaff } from '../types/models';
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
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Staff.countDocuments();

    //Lấy danh sách khớp với điều kiện cần lấy
    const staffs = await Staff
    .find({})
    .select('-__v')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = staffs.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        sortBy: sortObject,
        staffs: staffs
    }
}

const getStaffById  = async (id:string)=>{
    //SELECT * FROM staffs WHERE _id = id
    const result = await Staff.findById(id);

    if(!result){
        throw createError(404,'Staff not found');
    }
    return result;
}

const createStaff = async (data: IStaff)=>{
    const result = await Staff.create(data)
    return result;
}

const updateStaff = async (id: string,payload: IStaff)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const staff = await getStaffById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(staff, payload);
    await staff.save();

    return staff
}

const deleteStaff = async (id:string)=>{
   
    // const staff = await Staff.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const staff = await getStaffById(id);
    await Staff.deleteOne({ _id: staff._id });
    return staff
}

export default {
    getAll,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
}