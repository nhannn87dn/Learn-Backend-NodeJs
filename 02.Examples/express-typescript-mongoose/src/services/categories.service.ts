import createError from 'http-errors';
import Category from  '../models/Category.model'
import { ICategory} from "../types/models";
/**
 * Get All Categorys
 */
const findAll = async () => {
    const result = await Category.find();
    return result;
}

/**
 * Get a Category by ID
 */
const findById = async (id: string) => {
    const result = await Category.findById(id);
    if(!result){
        throw createError(404,`Category not found`);
    }
    return result;
}


// Get a item by ID
const getById = async (id: string) => {
  
    const result = await Category.findById(id);
  
    console.log("<<< getUserById >>>", id, result);
  
    if (!result) {
      throw createError(404, "Category not found");
    }
  
    return result;
  };
  
  // Create a new user
  const create = async (payload: ICategory) => {
    console.log("createUser");
  
    // Lưu xuống database
    const result = await Category.create(payload);
    // Or Category.save(payload);
  
    /* Trả lại thông tin cho response */
    return result;
  };
  
  // Update a user by ID
  const updateById = async (id: string, payload: ICategory) => {
    //Lấy lại hàm trên để khởi tạo instance
    const category = await getById(id);

  
    Object.assign(category, payload); //overwrite
    await category.save();
  
    return category;
  };
  
  // Delete a user by ID
  const deleteById = async (id: string) => {
    console.log("deleteUserById");

    //Lấy lại hàm trên để khởi tạo instance
    const category = await getById(id);

    await category.deleteOne({ _id: category._id });
  
    //return to category before delete
    return category;
  };

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
