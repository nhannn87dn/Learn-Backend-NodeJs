import express from "express";
import brandsController from "../../controllers/brands.controller";

const router   = express.Router();

//Dinh nghia cac routes cho resource Brands

//Get All
//http://localhost:8080/api/v1/brands
router.get('', brandsController.getAll)

//Get By ID
//http://localhost:8080/api/v1/brands/:id
router.get('/:id', brandsController.getBrandById)


//Create brand 
///http://localhost:8080/api/v1/brands
router.post('',  brandsController.createBrand)

//Update brand By ID
///http://localhost:8080/api/v1/brands/:id
router.put('/:id', brandsController.updateBrand)

//Delete brand By ID
///http://localhost:8080/api/v1/brands/:id
router.delete('/:id', brandsController.deleteBrand)

export default router