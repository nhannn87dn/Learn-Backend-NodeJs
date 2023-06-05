const createError = require('http-errors');
const {Product, Gallery} = require('../models/product.model');

// Get all Products
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

// Get a Product by ID
const getProductById = async (req) => {
  try {
    const { id } = req.params;

    const result = Product.findById(id);

    console.log(id, result);

    if (!result) {
      throw createError(404, 'Product not found');
    }

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Create a new Product
const createProduct = async (req) => {
  console.log('createProduct');

  try {
    // Lưu xuống database
    const result = await Product.create(req.body);

    /* Trả lại thông tin cho response */
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Update a Product by ID
const updateProductById = async (req) => {
  try {
    const { id } = req.params;
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const Product = await getProductById(id);

    if (!Product) {
      throw createError(404, 'Product not found');
    }
    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(Product, req.body);
    await Product.save();

    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Delete a Product by ID
const deleteProductById = async (req) => {
  try {
    const { id } = req.params;

    const Product = await getProductById(id);

    if (!Product) {
      throw createError(404, 'Product not found');
    }

    await Product.remove({ _id: ObjectId(Product._id) });

    return Product;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
