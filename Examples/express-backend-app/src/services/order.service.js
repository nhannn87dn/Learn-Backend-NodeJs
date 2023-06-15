const createError = require("http-errors");
const Order = require("../models/order.model");

// Get all Orders
const getAll = async () => {
  const result = await Order.find();
  return result;
};

// Get an order by ID
const getById = async (id) => {
  const result = await Order.findById(id);

  if (!result) {
    throw createError(404, "Order not found");
  }
  return result;
};

// Create a new order
const create = async (req) => {
  const result = await Order.create(req.body);
  return result;
};

// Update an order by ID
const updateById = async (req) => {
  const { id } = req.params;
  const order = await getById(id);

  Object.assign(order, req.body);
  await order.save();

  return order;
};

// Delete an order by ID
const deleteById = async (id) => {
  const order = await getById(id);

  await order.deleteOne({ _id: order._id });

  return order;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
