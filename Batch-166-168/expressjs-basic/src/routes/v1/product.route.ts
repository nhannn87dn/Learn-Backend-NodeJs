import express from "express"
import productController from '../../controllers/product.controller'
const router  = express.Router();

/*
GET - Get all products
localhost:8080/api/v1/products
*/
router.get('', productController.findAll);
/*
GET get one product by ID
localhost:8080/api/v1/products/:id
*/
router.get('/:id', productController.findOne);
/**
 * POST - Create a new product
 * localhost:8080/api/v1/products
 */
router.post('', productController.create);
/*
PUT get one product by ID
localhost:8080/api/v1/products/:id
*/
router.put('/:id', productController.updateById);
/*
DELETE get one product by ID
localhost:8080/api/v1/products/:id
*/
router.delete('/:id', productController.deleteById);

export default router