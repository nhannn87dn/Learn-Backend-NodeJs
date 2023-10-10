import createError from 'http-errors';
import Employee from  '../models/Employee.model'
import {  IEmployee} from "../types/models";
/**
 * Get All Employees
 */
const findAll = async () => {
    const employees = await Employee.find();
    return employees;
}

/**
 * Get a Employee by ID
 */
const findById = async (id: string) => {
    const employee = await Employee.findById(id);
    if(!employee){
        throw createError(404,`Employee not found`);
    }
    return employee;
}


// Get a user by ID
const getById = async (id: string) => {
  
    const result = await Employee.findById(id);
  
    console.log("<<< getUserById >>>", id, result);
  
    if (!result) {
      throw createError(404, "User not found");
    }
  
    return result;
  };
  
  // Create a new user
  const create = async (payload: IEmployee) => {
    console.log("createUser");
  
    // Lưu xuống database
    const user = await Employee.create(payload);
    // Or Employee.save(payload);
  
    /* Trả lại thông tin cho response */
    return user;
  };
  
  // Update a user by ID
  const updateById = async (id: string, payload: IEmployee) => {
    //Lấy lại hàm trên để khởi tạo instance
    const employee = await getById(id);

    //Check email tồn tại chưa
    if (payload.email && (await Employee.isEmailTaken(payload.email, id))) {
        throw createError(400, "Email is already taken");
    }

    Object.assign(employee, payload); //overwrite
    await employee.save();
  
    return employee;
  };
  
  // Delete a user by ID
  const deleteById = async (id: string) => {
    console.log("deleteUserById");

    //Lấy lại hàm trên để khởi tạo instance
    const employee = await getById(id);

    await employee.deleteOne({ _id: employee._id });
  
    //return to employee before delete
    return employee;
  };

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
