const createError = require('http-errors');
const {Product} = require('../models/product.model');

// Get all Products
const getAll = async () => {
  const result = await Product.find();
  return result;
};

// Get a Product by ID
const getById = async (id) => {
  try {
   
    const result = await Product.findById(id);

    if (!result) {
      throw createError(404, 'Product not found');
    }

    return result;
  } catch (err) {
    throw createError(500, err);
  }
};

// Create a new Product
const create = async (req) => {
  console.log('createProduct');

  try {
    // Lưu xuống database
    const result = await Product.create(req.body);

    /* Trả lại thông tin cho response */
    return result;
  } catch (err) {
    throw createError(500, err);
  }
};

// Update a Product by ID
const updateById = async (req) => {
  try {
    const { id } = req.params;
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getById(id);

    if (!product) {
      throw createError(404, 'Product not found');
    }
    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(product, req.body);
    await product.save();

    return product;
  } catch (err) {
    throw createError(500, err);
  }
};

// Delete a Product by ID
const deleteById = async (id) => {
  try {
   

    const product = await getById(id);

    if (!product) {
      throw createError(404, 'Product not found');
    }

    await Product.deleteOne({ _id: product._id });

    return product;
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
