import createError from 'http-errors';
import Staff from '../models/staff.model';
import { IStaff } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Staff.find();
    return result
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