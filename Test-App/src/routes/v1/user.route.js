const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
const userValidation = require('../../validations/user.validation');


//http://localhost:8686/api/v1/users
router.get('/', userController.getAllUsers);

//localhost:8686/api/v1/users/:id
http: router.get(
  '/:id',
  validateSchema(userValidation.getUserById),
  userController.getUserById
);

//http://localhost:8686/api/v1/users
router.post('/', userController.createUser);

//localhost:8686/api/v1/users/:id
http: router.put('/:id', userController.updateUserById);

//localhost:8686/api/v1/users
router.delete('/', userController.deleteUserById);


module.exports = router;
