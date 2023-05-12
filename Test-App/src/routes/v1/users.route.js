const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

const validateSchema = require('../../middlewares/validateSchema.middleware');
const userValidation = require('../../validations/user.validation');

console.log(userValidation);

//http://localhost:8686/api/v1/users
router.get('/', usersController.getAllUsers);

//localhost:8686/api/v1/users/:id
http: router.get(
  '/:id',
  validateSchema(userValidation.getUserById),
  usersController.getUserById
);

//http://localhost:8686/api/v1/users
router.post('/', usersController.createUser);

//localhost:8686/api/v1/users/:id
http: router.put('/:id', usersController.updateUserById);

//localhost:8686/api/v1/users/:id
router.delete('/:id', usersController.deleteUserById);

module.exports = router;
