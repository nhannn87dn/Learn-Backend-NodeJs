const createError = require("http-errors");
const Brand = require("../models/brand.model");

// Get all Brands
const getAll = async () => {
  const result = await Brand.find();
  return result;
};

// Get a brand by ID
const getById = async (id) => {
  const result = await Brand.findById(id);

  if (!result) {
    throw createError(404, "Brand not found");
  }
  return result;
};

// Create a new brand
const create = async (req) => {
  const result = await Brand.create(req.body);
  return result;
};

// Update a brand by ID
const updateById = async (req) => {
  const { id } = req.params;
  const brand = await getById(id);

  Object.assign(brand, req.body);
  await brand.save();

  return brand;
};

// Delete a brand by ID
const deleteById = async (id) => {
  const brand = await getById(id);

  await brand.deleteOne({ _id: brand._id });

  return brand;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
