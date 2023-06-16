const userService = require('../services/user.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    //res.status(200).send(users);
    responseHandler.sendJsonSuccess(res)(users);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req);
    responseHandler.sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.create = async (req, res, next) => {
  try {
    const users = await userService.create(req);
    // res.send(user);
    responseHandler.sendJsonSuccess(res)(users);
  } catch (err) {
    next(err);
  }
};

// Update a user by ID
exports.updateById = async (req, res, next) => {
  try {
    const user = await userService.updateById(req);
    // res.send(user);
    responseHandler.sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID
exports.deleteById = async (req, res, next) => {
  try {
    const user = await userService.deleteById(req.body.id);
    responseHandler.sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};
