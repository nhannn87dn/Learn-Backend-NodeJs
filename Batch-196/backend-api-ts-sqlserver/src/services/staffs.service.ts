import createError from 'http-errors';
import argon2 from 'argon2';
import Staff from '../models/Staff.model';
import { CreateStaffDto, UpdateStaffDto } from '../types/staff.type';

const findAll = async (query: any) => {
  const { page = 1, limit = 10, keyword = '', role } = query;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (keyword && keyword !== '') {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (role && role !== '') {
    filter.role = role;
  }

  const staffs = await Staff.find(filter)
    .select('-password')
    .skip(skip)
    .limit(limit);

  const totalRecords = await Staff.countDocuments(filter);

  return {
    data: staffs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalRecords / limit),
      totalRecords,
    },
  };
};

const findById = async (id: string) => {
  const staff = await Staff.findById(id).select('-password');
  return staff;
};

const getByIdOrFail = async (id: string) => {
  const staff = await findById(id);
  if (!staff) {
    throw createError(404, 'Staff not found');
  }
  return staff;
};

const create = async (createStaffDto: CreateStaffDto) => {
  const hashedPassword = await hashPassword(createStaffDto.password);
  const newStaff = await Staff.create({
    ...createStaffDto,
    password: hashedPassword, //mã hóa mật khẩu trước khi lưu vào database
  });
  const staff = await Staff.findById(newStaff._id).select('-password');
  return staff;
};

const updateById = async (id: string, updateStaffDto: UpdateStaffDto) => {
  const staff = await Staff.findById(id);
  if (!staff) {
    throw createError(404, 'Staff not found');
  }

  if (updateStaffDto.name !== undefined) {
    staff.name = updateStaffDto.name;
  }
  if (updateStaffDto.email !== undefined) {
    staff.email = updateStaffDto.email;
  }
  // Nếu có cập nhật mật khẩu, thì mã hóa mật khẩu mới trước khi lưu
  if (updateStaffDto.password !== undefined) {
    staff.password = await hashPassword(updateStaffDto.password);
  }
  if (updateStaffDto.is_active !== undefined) {
    staff.is_active = updateStaffDto.is_active;
  }
  if (updateStaffDto.role !== undefined) {
    staff.role = updateStaffDto.role;
  }

  await staff.save();
  const updatedStaff = await Staff.findById(id).select('-password');
  return updatedStaff;
};

const deleteById = async (id: string) => {
  const staff = await getByIdOrFail(id);
  await Staff.deleteOne({ _id: id });
  return staff;
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await argon2.hash(password);
  } catch (error) {
    throw createError(500, 'Failed to hash password');
  }
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    return false;
  }
};

const verifyStaffCredentials = async (email: string, password: string) => {
  //1. Tìm người dùng trong database theo email
  const staff = await Staff.findOne({ email });
  if (!staff) {
    throw createError(401, 'Invalid email or password');
  }

  //2.Nếu tìm thấy thì đi so sánh mật khẩu đã nhập với mật khẩu đã lưu trong database
  const isMatch = await comparePassword(password, staff.password);
  if (!isMatch) {
    throw createError(401, 'Invalid email or password');
  }

  return staff;
};

export default {
  findAll,
  findById,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
 comparePassword,
  verifyStaffCredentials,
};
