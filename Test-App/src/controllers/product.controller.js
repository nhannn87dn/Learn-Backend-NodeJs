const productService = require('../services/product.service');
const responseHandler = require('../helpers/responseHandler');

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Create a new product
const createProduct = async (req, res, next) => {
  try {
    const result = await productService.createProduct(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Update a product by ID
const updateProductById = async (req, res, next) => {
  try {
    const result = await productService.updateProductById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Delete a product by ID
const deleteProductById = async (req, res, next) => {
  try {
    const result = await productService.deleteProductById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
}