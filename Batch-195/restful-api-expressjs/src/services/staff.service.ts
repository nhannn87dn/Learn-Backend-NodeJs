import { IStaffDTO } from '../types/staff.type';
import createError from 'http-errors';
import Staff from '../models/staff.model';

const getAllStaff = async (query: any) => {
  //pagination
  const { page = '1', limit = '10' } = query;
  const pageNumber = parseInt(page as string, 10); //default page 1
  const limitNumber = parseInt(limit as string, 10); //default limit 10
  const skip = (pageNumber - 1) * limitNumber;

  //implement filters
  let where: any = {};

  //filter by keyword (search in fullName and email)
  if(query.keyword && query.keyword !== '') {
    where = {
      ...where,
      $or: [
        {
          fullName: {
            $regex: query.keyword,
            $options: 'i'
          }
        },
        {
          email: {
            $regex: query.keyword,
            $options: 'i'
          }
        }
      ]
    }
  }

  //filter by role
  if(query.role && query.role !== '') {
    where = {
      ...where,
      role: query.role
    }
  }

  //filter by active status
  if(query.active && query.active !== '') {
    where = {
      ...where,
      active: query.active === 'true' ? true : false,
    }
  }

  //implement sorting
  let sortObj: any = {};
  const sortBy = query?.sortBy || 'createdAt'; //default sort by createdAt
  const sortType = query?.sortType === 'asc' ? 1 : -1; //default desc
  sortObj[sortBy] = sortType;

  
  const [staff, total] = await Promise.all([
    Staff.find({
        ...where
    })
      .select('-password') //exclude password from results
      .sort(sortObj)
      .skip(skip)
      .limit(limitNumber),
    Staff.countDocuments({
        ...where
    }),
  ]);
  const totalPages = Math.ceil(total / limitNumber);

  return {
    items: staff,
    pagination: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
    }
  };
};

const getStaffById = async (id: string) => {
  // SELECT * FROM staff WHERE id = id
  const staff = await Staff
    .findById(id)
    .select('-password'); //exclude password
  
  if (!staff) {
    throw createError(404, 'Staff not found');
  }
  return staff;
};

const createStaff = async (payload: IStaffDTO) => {
  //step 1: validate unique email
  await makeSureEmailIsUnique(payload.email);

  //step 2: hash password before saving (you should implement bcrypt here)
  // const hashedPassword = await bcrypt.hash(payload.password, 10);

  // step final: create new staff
  const newStaff = {
    fullName: payload.fullName,
    email: payload.email,
    active: payload.active !== undefined ? payload.active : true,
    password: payload.password, // Should be: hashedPassword
    role: payload.role || 'staff',
  };
  
  const staff = new Staff(newStaff);
  const result = await staff.save(); // lưu vào database
  
  // Remove password from result before returning
  const staffObject = result.toObject();
  delete staffObject.password;
  
  return staffObject;
};

const updateStaffById = async (id: string, payload: IStaffDTO) => {
  //step 1: check if staff exists
  let staff = await Staff.findById(id);
  
  if (!staff) {
    throw createError(404, 'Staff not found');
  }

  //step 2: if email is being changed, validate unique email
  if (payload.email && payload.email !== staff.email) {
    await makeSureEmailIsUnique(payload.email);
  }

  //step 3: if password is being changed, hash it
  // if (payload.password) {
  //   payload.password = await bcrypt.hash(payload.password, 10);
  // }

  Object.assign(staff, {
    fullName: payload.fullName,
    email: payload.email,
    active: payload.active,
    role: payload.role,
    ...(payload.password && { password: payload.password }), // only update password if provided
  });
  
  const result = await staff.save();
  
  // Remove password from result before returning
  const staffObject = result.toObject();
  delete staffObject.password;
  
  return staffObject;
};

const deleteStaffById = async (id: string) => {
  // check if staff exists
  const staff = await Staff.findById(id);
  
  if (!staff) {
    throw createError(404, 'Staff not found');
  }
  
  const result = await Staff.deleteOne({ _id: staff._id });
  // trả về kết quả xóa
  return result;
};

const makeSureEmailIsUnique = async (email: string) => {
  const existingStaff = await Staff.findOne({ email: email.toLowerCase() });
  if (existingStaff) {
    throw createError(400, 'Email is already in use');
  }
  return true;
};

export default {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaffById,
  deleteStaffById,
};
