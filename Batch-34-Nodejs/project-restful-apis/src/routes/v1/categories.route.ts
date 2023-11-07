import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import authMiddleware from '../../middleware/auth.middleware';
import categoriesTypeORMController from '../../controllers/categoriesTypeORM.controller';
/***
 * Route chỉ làm nhiệm vụ định tuyến
 * Mapping request giữa client với Server
 * ==> Không nên chứa các Logic 
 */
const router = express.Router();

//Get All categories from DB
router.get('/', categoriesController.getAll);
//Test typeORM
router.get('/typeorm/getall', categoriesTypeORMController.getAll);

//Test typeORM
router.get('/typeorm/:id', categoriesTypeORMController.getItemById);

//get user by ID
//Gắn middleware vào để check id có phải là số không
router.get('/:id', categoriesController.getItemById);

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
