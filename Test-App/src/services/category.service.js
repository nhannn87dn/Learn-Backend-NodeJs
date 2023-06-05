const createError = require('http-errors');
const Category = require('../models/category.model');

// Get all Categories
const getAllCategories = async () => {
  const result = await Category.find();
  return result;
};

// Get a category by ID
const getCategoryById = async (req) => {
  try {
    const { id } = req.params;

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
const createCategory = async (req) => {
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
const updateCategoryById = async (req) => {
  try {
    const { id } = req.params;
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await getCategoryById(id);

    if (!category) {
      throw createError(404, 'Category not found');
    }
    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(category, req.body);
    await category.save();

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Delete a category by ID
const deleteCategoryById = async (req) => {
  try {
    const { id } = req.params;

    const category = await getCategoryById(id);

    if (!category) {
      throw createError(404, 'Category not found');
    }

    await category.remove({ _id: ObjectId(category._id) });

    return category;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
