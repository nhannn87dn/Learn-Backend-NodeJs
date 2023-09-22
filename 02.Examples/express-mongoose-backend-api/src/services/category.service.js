const createError = require("http-errors");
const Category = require("../models/category.model");

// Get all Categories
const getAll = async () => {
  const result = await Category.find();
  return result;
};

// Get a category by ID
const getById = async (id) => {
  const result = await Category.findById(id);

  console.log("<<=== Service getById result ===>>", result);

  if (!result) {
    throw createError(404, "Category not found");
  }
  return result;
};

// Get a category by ID
const getBySlug = async (slug) => {
  const result = await Category.findOne({ slug: slug });

  console.log("<<=== getBySlug result ===>>", slug, result);

  if (!result) {
    throw createError(404, "Category not found");
  }
  return result;
};

// Create a new category
const create = async (req) => {
  console.log("createCategory");
  // Lưu xuống database
  const result = await Category.create(req.body);
  /* Trả lại thông tin cho response */
  return result;
};

// Update a category by ID
const updateById = async (req) => {
  const { id } = req.params;
  console.log("<<=== 🚀 updateById id ===>>", id);
  /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
  const category = await getById(id);

  /**
   * Dùng assign để merge giữa cũ và mới lại với nhau
   * Sau đó save lại
   * Muốn update trường nào thì chỉ cần update trường đó
   */
  Object.assign(category, req.body);
  await category.save();

  return category;
};

// Delete a category by ID
const deleteById = async (id) => {
  console.log("<<===  Service deleteById ===>>", id);

  const category = await getById(id);

  await category.deleteOne({ _id: category._id });

  return category;
};

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  updateById,
  deleteById,
};
