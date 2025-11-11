import express, { Router } from 'express';
import productsController from '../../controllers/products.controller';

const router = express.Router() as Router;

//GET api/v1/products ==> get all products
router.get('/', productsController.findAll);
//GET api/v1/products/:id ==> get product by id
router.get('/:id', productsController.findById)
//POST api/v1/products ==> create new product
router.post('/', productsController.create)
//PUT api/v1/products/:id ==> Update a product
router.put('/:id', productsController.updateById)
//DELETE api/v1/products/:id ==> Delete a product by id
router.delete('/:id', productsController.deleteById)

export default router;
