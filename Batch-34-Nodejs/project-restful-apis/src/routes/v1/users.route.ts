import express from 'express';
import usersController from '../../controllers/users.controller';
/***
 * Route chỉ làm nhiệm vụ định tuyến
 * Mapping request giữa client với Server
 * ==> Không nên chứa các Logic 
 */
const router = express.Router();

//Get All users from DB
router.get('/users', usersController.getAllUsers);

//get user by ID
router.get('/users/:id([0-9]+)', usersController.getUserById);

//Create a new user
router.post('/users', usersController.createItem);

/**
 * Update a user by ID
 * PATH /api/v1/users/:id
 */
router.patch('/users/:id([0-9]+)', usersController.updateItem);

/**
 * Delete a user by ID
 * DELETE /api/v1/users/:id
 */
router.delete('/users/:id([0-9]+)', usersController.deleteItem);

//Xuất router ra
export default router;
