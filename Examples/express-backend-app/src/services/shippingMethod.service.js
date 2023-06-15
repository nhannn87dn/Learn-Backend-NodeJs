const createError = require("http-errors");
const ShippingMethod = require("../models/shippingMethod.model");

// Get all Shipping Methods
const getAll = async () => {
  const result = await ShippingMethod.find();
  return result;
};

// Get a shipping method by ID
const getById = async (id) => {
  const result = await ShippingMethod.findById(id);

  if (!result) {
    throw createError(404, "Shipping method not found");
  }
  return result;
};

// Create a new shipping method
const create = async (req) => {
  const result = await ShippingMethod.create(req.body);
  return result;
};

// Update a shipping method by ID
const updateById = async (req) => {
  const { id } = req.params;
  const shippingMethod = await getById(id);

  Object.assign(shippingMethod, req.body);
  await shippingMethod.save();

  return shippingMethod;
};

// Delete a shipping method by ID
const deleteById = async (id) => {
  const shippingMethod = await getById(id);

  await shippingMethod.deleteOne({ _id: shippingMethod._id });

  return shippingMethod;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
