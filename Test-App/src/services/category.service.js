const createError = require('http-errors');
const fileHandlerHelper = require('../helpers/fileHandlerHelper');
const Category = require('../models/category.model');

// Get all Categories
exports.getAllCategories = async () => {
  const result = await Category.find();
  return result;
};

// Get a category by ID
exports.getCategoryById = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing category ID');
    }

    const result = Category.findById(id);

    console.log(id, result);

    if (!result) {
      throw createError(404, 'Category not found');
    }

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Create a new category
exports.createCategory = async (req) => {
  console.log('createCategory');

  try {
    // Lưu xuống database
    const result = await Category.create(req.body);

    /* Trả lại thông tin cho response */
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Update a category by ID
exports.updateCategoryById = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing ID');
    }
    
    const result = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req) => {
  console.log('deleteCategoryById');

  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing  ID');
    }
    
    const result = await Category.findByIdAndDelete(id);

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};
