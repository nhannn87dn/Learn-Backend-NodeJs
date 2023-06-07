const categoryService = require('../services/category.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAll = async (req, res, next) => {
  try {
    const result = await categoryService.getAll();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.getById(id);
    console.log('<<===  Controller getById result ===>>',result);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Create a new category
exports.create = async (req, res, next) => {
  try {
    const result = await categoryService.create(req);
    // res.send(category);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Update a category by ID
exports.updateById = async (req, res, next) => {
  try {
    const result = await categoryService.updateById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

// Delete a category by ID
exports.deleteById = async (req, res, next) => {
  try {
    const result = await categoryService.deleteById(req.body.id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};
