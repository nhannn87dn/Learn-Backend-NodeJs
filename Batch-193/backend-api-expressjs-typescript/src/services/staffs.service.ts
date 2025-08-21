import createError from "http-errors";
import Staff from "../models/Staff.model";

const findAll = async (query: any) => {
  // You can implement filtering, sorting, and pagination based on the query parameters
  // For example, if you want to filter by active status:
  const { page = 1, limit = 5, sort = 'desc', keyword = null, active = null } = query;
  const filter: any = {};
  if (active) {
    filter.active = query.active === 'true'; // Convert string to boolean
  }
  if (keyword) {
    filter.$or = [
      { first_name: new RegExp(keyword, 'i') },
      { last_name: new RegExp(keyword, 'i') },
      { email: new RegExp(keyword, 'i') }
    ];
  }
  const staffs = await Staff
  .find({ ...filter })
  .sort({ createdAt: sort === 'asc' ? 1 : -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  return {
    staffs,
    page,
    limit,
    totalRecords: await Staff.countDocuments(),
  };
};

const findById = async (id: string) => {
  const staff = await Staff.findById(id);
  if (!staff) {
    throw createError(404, "Staff not found");
  }
  return staff;
};

const create = (payload: any) => {

  const newStaff = new Staff({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    active: payload.active,
    password: payload.password,
  });
  newStaff.save();
  return newStaff;
};

const updateById = async (id: string, payload: any) => {
  const staff = await findById(id);
 
  Object.assign(staff, payload);
 
  console.log('<<=== 🚀updateById staff ===>>',staff);
  await staff.save();
  return staff;
};


const deleteById = async (id: string) => {
  const staff = await findById(id);
  await Staff.findByIdAndDelete(staff._id);
  return staff;
};

const addRole = async (id: string, role: string) => {
  const staff = await findById(id);
  //check duplicate role
  if (staff.roles.includes(role)) {
    throw createError(400, "Role already exists");
  }
  staff.roles.push(role);
  await staff.save();
  return staff;
};

const removeRole = async (id: string, role: string) => {

  const staff = await findById(id);
  //check role exists
  if (!staff.roles.includes(role)) {
    throw createError(400, "Role not found");
  }
  staff.roles = staff.roles.filter((r: string) => r !== role);
  await staff.save();
  return staff;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  addRole,
  removeRole
};
