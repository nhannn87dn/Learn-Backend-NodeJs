import express from 'express';
import customersController from '../../controllers/customers.controller';
import authMiddleware from '../../middleware/auth.middleware'
/***
 * Route chỉ làm nhiệm vụ định tuyến
 * Mapping request giữa client với Server
 * ==> Không nên chứa các Logic 
 */
const router = express.Router();

//Get All customers from DB
router.get('/', customersController.getAll);


//get user by ID
//Gắn middleware vào để check id có phải là số không
router.get('/:id', customersController.getItemById);


//Create a new user
router.post('/', customersController.createItem);

/**
 * Update a user by ID
 * PATH /api/v1/customers/:id
 */
router.patch('/:id',  customersController.updateItem);

/**
 * Delete a user by ID
 * DELETE /api/v1/customers/:id
 */
router.delete('/:id', customersController.deleteItem);

//Xuất router ra
export default router;
