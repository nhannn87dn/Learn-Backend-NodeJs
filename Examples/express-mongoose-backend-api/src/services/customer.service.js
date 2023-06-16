const createError = require("http-errors");
const Customer = require("../models/customer.model");

// Get all Customers
const getAll = async () => {
  const result = await Customer.find();
  return result;
};

// Get a customer by ID
const getById = async (id) => {
  const result = await Customer.findById(id);

  console.log("<<=== Service getById result ===>>", result);

  if (!result) {
    throw createError(404, "Customer not found");
  }
  return result;
};

// Create a new customer
const create = async (req) => {
  console.log("createCustomer");
  // Lưu xuống database
  const result = await Customer.create(req.body);
  /* Trả lại thông tin cho response */
  return result;
};

// Update a customer by ID
const updateById = async (req) => {
  const { id } = req.params;
  console.log("<<=== 🚀 updateById id ===>>", id);
  /* Tận dùng hàm có sẳn để tìm xem khách hàng có tồn tại chưa */
  const customer = await getById(id);

  /**
   * Dùng assign để merge giữa cũ và mới lại với nhau
   * Sau đó save lại
   * Muốn update trường nào thì chỉ cần update trường đó
   */
  Object.assign(customer, req.body);
  await customer.save();

  return customer;
};

// Delete a customer by ID
const deleteById = async (id) => {
  console.log("<<===  Service deleteById ===>>", id);

  const customer = await getById(id);

  await customer.deleteOne({ _id: customer._id });

  return customer;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};