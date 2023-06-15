const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
const userValidation = require('../../validations/user.validation');


//http://localhost:8686/api/v1/users
router.get('/', userController.getAll);

//localhost:8686/api/v1/users/:id
http: router.get(
  '/:id',
  validateSchema(userValidation.getById),
  userController.getById
);

//http://localhost:8686/api/v1/users
router.post('/', userController.create);

//localhost:8686/api/v1/users/:id
http: router.put('/:id', userController.updateById);

//localhost:8686/api/v1/users
router.delete('/', userController.deleteById);


module.exports = router;
