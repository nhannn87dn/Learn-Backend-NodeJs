import express from "express";
import categoriesController from "../../controllers/categories.controller";
import validateSchemaYup from "../../middlewares/validateSchemaYup.middleware";
import categoriesYupValidation from "../../validations/categoriesYup.validation";
const router   = express.Router();

//Dinh nghia cac routes cho resource Categories

//Get All
//http://localhost:8080/api/v1/categories
router.get('', validateSchemaYup(categoriesYupValidation.getAll), categoriesController.getAll)

//Get By ID
//http://localhost:8080/api/v1/categories/:id
router.get('/:id', validateSchemaYup(categoriesYupValidation.getCategoryById), categoriesController.getCategoryById)


//Create category 
///http://localhost:8080/api/v1/categories
router.post('',  categoriesController.createCategory)

//Update category By ID
///http://localhost:8080/api/v1/categories/:id
router.put('/:id', categoriesController.updateCategory)

//Delete category By ID
///http://localhost:8080/api/v1/categories/:id
router.delete('/:id', categoriesController.deleteCategory)

export default router