const orderService = require('../services/order.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAll = async (req, res, next) => {
  try {
    const result = await orderService.getAll();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderService.getById(id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await orderService.create(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const result = await orderService.updateById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const result = await orderService.deleteById(req.body.id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

module.exports = exports;
