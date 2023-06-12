const configService = require('../services/config.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAll = async (req, res, next) => {
  try {
    const result = await configService.getAll();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await configService.getById(id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await configService.create(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const result = await configService.updateById(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const result = await configService.deleteById(req.body.id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

module.exports = exports;
