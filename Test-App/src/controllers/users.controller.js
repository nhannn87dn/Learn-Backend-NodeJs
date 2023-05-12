const usersService = require('../services/users.service');
const responseHandler = require('../utilities/responseHandler');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    //res.status(200).send(users);
    responseHandler.sendJsonSuccess(res)(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req);
    // res.send(user);
    responseHandler.sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  console.log('createUser');
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
  console.log('updateUserById');
};

// Delete a user by ID
exports.deleteUserById = async (req, res, next) => {
  console.log('deleteUserById');
};
