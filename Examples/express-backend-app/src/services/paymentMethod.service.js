const createError = require("http-errors");
const PaymentMethod = require("../models/paymentMethod.model");

// Get all Payment Methods
const getAll = async () => {
  const result = await PaymentMethod.find();
  return result;
};

// Get a payment method by ID
const getById = async (id) => {
  const result = await PaymentMethod.findById(id);

  if (!result) {
    throw createError(404, "Payment method not found");
  }
  return result;
};

// Create a new payment method
const create = async (req) => {
  const result = await PaymentMethod.create(req.body);
  return result;
};

// Update a payment method by ID
const updateById = async (req) => {
  const { id } = req.params;
  const paymentMethod = await getById(id);

  Object.assign(paymentMethod, req.body);
  await paymentMethod.save();

  return paymentMethod;
};

// Delete a payment method by ID
const deleteById = async (id) => {
  const paymentMethod = await getById(id);

  await paymentMethod.deleteOne({ _id: paymentMethod._id });

  return paymentMethod;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
