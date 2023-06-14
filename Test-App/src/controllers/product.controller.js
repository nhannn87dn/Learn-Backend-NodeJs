const productService = require('../services/product.service');
const responseHandler = require('../helpers/responseHandler');

const getAll = async (req, res, next) => {
  try {
    const result = await productService.getAll();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const {slug} = req.params;
    const result = await productService.getBySlug(slug);
    console.log('<<===  Controller getBySlug result ===>>',result);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};


// Create a new product
const create = async (req, res, next) => {
  try {
    const result = await productService.create(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Update a product by ID
const updateById = async (req, res, next) => {
  try {
    const result = await productService.updateById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Delete a product by ID
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteById(id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  updateById,
  deleteById
}