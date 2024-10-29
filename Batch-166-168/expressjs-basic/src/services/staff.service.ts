import createError from "http-errors";
import Staff from "../models/staff.model";


/* get ALl staffs */
const findAll = async () => {
  //Lay du lieu trong DB
  // return lai cho controller
  const result = await Staff.find();
  return result;
};

/* get Single Staff */
const findOne = async (id: string) => {
  const staff = await Staff.findById(id);
  if(!staff){
    throw createError(400, "Staff not found")
  }
  return staff;
};

/* create a new staff */
const create = async (payload: any) => {
  console.log("<<=== 🚀 payload ===>>", payload);
  const staff = await Staff.create(payload);
  return staff;
};

/* update a staff */
const updateById =async (id: string, payload: any) => {
  //kiem tra su ton tai
  const staff = await findOne(id);
    Object.assign(staff, payload);
    await staff.save();
  
  return staff;
};

/* delete a staff */
const deleteById = async(id: string) => {
  //kiem tra su ton tai
  const staff = await findOne(id);

  await Staff.findByIdAndDelete(id);
  return staff;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};
