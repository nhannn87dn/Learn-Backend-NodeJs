import express from "express";
import productsController from "../../controllers/products.controller";

const router   = express.Router();

//Dinh nghia cac routes cho resource Products

//Get All
//http://localhost:8080/api/v1/products
router.get('', productsController.getAll)

//Get By ID
//http://localhost:8080/api/v1/products/:id
router.get('/:id', productsController.getProductById)


//Create product 
///http://localhost:8080/api/v1/products
router.post('',  productsController.createProduct)

//Update product By ID
///http://localhost:8080/api/v1/products/:id
router.put('/:id', productsController.updateProduct)

//Delete product By ID
///http://localhost:8080/api/v1/products/:id
router.delete('/:id', productsController.deleteProduct)

export default router