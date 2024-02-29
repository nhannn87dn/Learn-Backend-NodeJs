import express from 'express';
import categoriesTypeORMController from '../../controllers/categoriesTypeORM.controller';
/***
Route này sử dụng TypeORM
 */
const router = express.Router();

//Get All categories from DB
router.get('/', categoriesTypeORMController.getAll);


//get user by ID
//Gắn middleware vào để check id có phải là số không
router.get('/:id', categoriesTypeORMController.getItemById);

//Create a new user
//Check Token
//Check xem user có quyền User không ?
// router.post('/', authMiddleware.checkToken, authMiddleware.checkAuthorize(["User","Admin"]), categoriesController.createItem);
router.post('/', categoriesTypeORMController.createItem);
/**
 * Update a user by ID
 * PATH /api/v1//:id
 */
//router.patch('/:id', authMiddleware.checkToken,  categoriesController.updateItem);
router.patch('/:id', categoriesTypeORMController.updateItem);

/**
 * Delete a user by ID
 * DELETE /api/v1//:id
 */
//router.delete('/:id', authMiddleware.checkToken, authMiddleware.checkAuthorize(["Admin"]), categoriesController.deleteItem);
router.delete('/:id',  categoriesTypeORMController.deleteItem);

//Xuất router ra
export default router;
