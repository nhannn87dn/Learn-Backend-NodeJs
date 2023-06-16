const createError = require("http-errors");
const Config = require("../models/config.model");

// Get all configs
const getAll = async () => {
  const result = await Config.find();
  return result;
};

// Get a config by ID
const getById = async (id) => {
  const result = await Config.findById(id);

  if (!result) {
    throw createError(404, "Config not found");
  }
  return result;
};

// Create a new config
const create = async (req) => {
  const result = await Config.create(req.body);
  return result;
};

// Update a config by ID
const updateById = async (req) => {
  const { id } = req.params;
  const config = await getById(id);

  Object.assign(config, req.body);
  await config.save();

  return config;
};

// Delete a config by ID
const deleteById = async (id) => {
  const config = await getById(id);

  await config.deleteOne({ _id: config._id });

  return config;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
