import createError from "http-errors";
import Staff from "../models/staff.model";
import { StaffCreateDTO } from "../types/staff";
import { hashPassword } from "../helpers/password.helper";

const findAll = async () => {
    //Lưu ý: không được trả về trường password
    const staffs = await Staff
    .find()
    .select("-password")
    
    return staffs;
};

const findById = async (id: string) => {
    //Lưu ý: không được trả về trường password khi tìm kiếm staff theo id
    const staff = await Staff.findById(id).select("-password");
    if (!staff) {
        throw createError(400, "Staff not found");
    }
    return staff;
};

const create = async (payload: StaffCreateDTO) => {
    //const newStaff = await Staff.create(payload);
    const newStaff = new Staff(payload);
    //hash password before saving to database
    newStaff.password = await hashPassword(payload.password);
    const result = await newStaff.save();
    //return without password field
    const { password, ...staffWithoutPassword } = result.toObject();
    return staffWithoutPassword;
};

const updateById = async (id: string, payload: Partial<StaffCreateDTO>) => {
    const staff = await findById(id);
    Object.assign(staff, payload);
    //hash password before saving to database if password is provided
    if (payload.password) {
        staff.password = await hashPassword(payload.password);
    }
    await staff.save();
    //return without password field
    const { password, ...staffWithoutPassword } = staff.toObject();
    return staffWithoutPassword;
};

const deleteById = async (id: string) => {
    const staff = await findById(id);
    await Staff.findByIdAndDelete(staff._id);
    //return without password field
    const { password, ...staffWithoutPassword } = staff.toObject();
    return  staffWithoutPassword;
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
