const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUserById);

router.delete('/:id', usersController.deleteUserById);

module.exports = router;
