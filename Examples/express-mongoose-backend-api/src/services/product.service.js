const createError = require("http-errors");
const { Product } = require("../models/product.model");

// Get all Products
const getAll = async () => {
  const result = await Product.find();
  return result;
};

// Get a Product by ID
const getById = async (id) => {
  const result = await Product.findById(id);

  if (!result) {
    throw createError(404, "Product not found");
  }

  return result;
};

// Get a category by ID
const getBySlug = async (slug) => {
  const result = await Product.findOne({ slug: slug });

  console.log("<<=== getBySlug result ===>>", slug, result);

  if (!result) {
    throw createError(404, "Product not found");
  }
  return result;
};

// Create a new Product
const create = async (req) => {
  console.log("createProduct");
  // Lưu xuống database
  const result = await Product.create(req.body);
  /* Trả lại thông tin cho response */
  return result;
};

// Update a Product by ID
const updateById = async (req) => {
  const { id } = req.params;
  /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
  const product = await getById(id);

  if (!product) {
    throw createError(404, "Product not found");
  }
  /**
   * Dùng assign để merge giữa cũ và mới lại với nhau
   * Sau đó save lại
   * Muốn update trường nào thì chỉ cần update trường đó
   */
  Object.assign(product, req.body);
  await product.save();

  return product;
};

// Delete a Product by ID
const deleteById = async (id) => {
  const product = await getById(id);

  if (!product) {
    throw createError(404, "Product not found");
  }

  await Product.deleteOne({ _id: product._id });

  return product;
};

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  updateById,
  deleteById,
};
