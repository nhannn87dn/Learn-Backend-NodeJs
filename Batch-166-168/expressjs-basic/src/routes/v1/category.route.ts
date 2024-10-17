import express from "express"
import categoryController from '../../controllers/category.controller'
const router  = express.Router();

/*
GET - Get all categories
localhost:8080/api/v1/categories
*/
router.get('', categoryController.findAll);
/*
GET get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.get('/:id', categoryController.findOne);
/**
 * POST - Create a new category
 * localhost:8080/api/v1/categories
 */
router.post('', categoryController.create);
/*
PUT get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.put('/:id', categoryController.updateById);
/*
DELETE get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.delete('/:id', categoryController.deleteById);

export default router