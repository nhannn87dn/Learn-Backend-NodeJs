const createError = require('http-errors');
const usersService = require('../services/users.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req);
    res.send(user);
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
