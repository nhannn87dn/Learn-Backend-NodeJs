const createError = require('http-errors');
const Category = require('../models/category.model');

// Get all Categories
const getAll = async () => {
  try {
    const result = await Category.find();
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Get a category by ID
const getById = async (id) => {
  try {
    const result = await Category.findById(id);

    console.log('<<=== Service result ===>>',result);

    if (!result) {
      throw createError(404, 'Category not found');
    }

    

    return result;
  } catch (err) {
    throw createError(500, err);
  }
};

// Get a category by ID
const getBySlug = async (slug) => {
  try {
    const result = await Category.findOne({slug: slug});

    console.log('<<=== Service result ===>>',slug,result);

    if (!result) {
      throw createError(404, 'Category not found');
    }

    

    return result;
  } catch (err) {
    throw createError(500, err);
  }
};


// Create a new category
const create = async (req) => {
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
const updateById = async (req) => {
  try {
    const { id } = req.params;
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const category = await getById(id);

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
const deleteById = async (id) => {
  try {
   console.log('<<===  Service deleteById ===>>',id);  
    
    const category = await getById(id);

    if (!category) {
      throw createError(404, 'Category not found');
    }

    await category.deleteOne({ _id: category._id });

    return category;
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  updateById,
  deleteById,
};
