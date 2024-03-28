import express from "express";
import productsController from "../../controllers/products.controller";
import validateSchema from "../../middlewares/validateSchema.middleware";
import productsValidation from "../../validations/products.validation";
const router   = express.Router();

//Dinh nghia cac routes cho resource Products

//Get All
//http://localhost:8080/api/v1/products
router.get('', validateSchema(productsValidation.getAll), productsController.getAll)


//Get All Client
//http://localhost:8080/api/v1/products/client/getall
router.get('/client/getall', validateSchema(productsValidation.getAll), productsController.getAllClient)


//Get By Slug
//http://localhost:8080/api/v1/products/slug/:slug
router.get('/slug/:slug', validateSchema(productsValidation.getProductBySlug), productsController.getProductBySlug)


//Get By ID
//http://localhost:8080/api/v1/products/:id
router.get('/:id', validateSchema(productsValidation.getProductById), productsController.getProductById)

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