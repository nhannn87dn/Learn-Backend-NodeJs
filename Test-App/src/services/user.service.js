const createError = require('http-errors');
const User = require('../models/user.model');

// Get all users
const getAllUsers = async () => {
  try {
      const result = await User.find();
      return result;
  } catch (err) {
    throw createError(500, err);
  }
};

// Get a user by ID
const getUserById = async (req) => {
  try {
    const { id } = req.params;

    const result = await User.findById(id);

    console.log('<<< getUserById >>>',id, result);

    if (!result) {
      throw createError(404, 'User not found');
    }

    return result;
  } catch (err) {
   //Chuyển tiếp lỗi ra cho App xử lý
    throw createError(500, err);
  }
};

// Create a new user
const createUser = async (req) => {
  console.log('createUser');

  try {
    // Lưu xuống database
    const user = await User.create(req.body);
    // Or User.save(payload);

    /* Trả lại thông tin cho response */
    return user;
  } catch (err) {
    throw createError(500, err);
  }
};

// Update a user by ID
const updateUserById = async (req) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return result;
  } catch (err) {
    throw createError(500, err);
  }
};

// Delete a user by ID
const deleteUserById = async (req) => {
  console.log('deleteUserById');

  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    return result;
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
