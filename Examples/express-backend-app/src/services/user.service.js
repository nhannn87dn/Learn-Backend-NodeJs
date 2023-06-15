const createError = require("http-errors");
const User = require("../models/user.model");

// Get all users
const getAll = async () => {
  const result = await User.find();
  return result;
};

// Get a user by ID
const getById = async (req) => {
  const { id } = req.params;

  const result = await User.findById(id);

  console.log("<<< getUserById >>>", id, result);

  if (!result) {
    throw createError(404, "User not found");
  }

  return result;
};

// Create a new user
const create = async (req) => {
  console.log("createUser");

  // Lưu xuống database
  const user = await User.create(req.body);
  // Or User.save(payload);

  /* Trả lại thông tin cho response */
  return user;
};

// Update a user by ID
const updateById = async (req) => {
  const { id } = req.params;

  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return result;
};

// Delete a user by ID
const deleteById = async (id) => {
  console.log("deleteUserById");

  const result = await User.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
