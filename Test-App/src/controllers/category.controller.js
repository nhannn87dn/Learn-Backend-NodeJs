const categoryService = require('../services/category.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategories();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const result = await categoryService.getCategoryById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req);
    // res.send(category);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res, next) => {
  try {
    const result = await categoryService.updateCategoryById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategoryById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};
