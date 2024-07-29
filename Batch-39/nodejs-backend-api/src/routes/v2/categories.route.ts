import express from 'express'
import categoriesController from '../../controllers/categories.controller'

const router = express.Router()

//1. Get All Categories
//GET localhost:8080/api/v1/categories
router.get('', categoriesController.findAll)

//2. Get One Category
//GET localhost:8080/api/v1/categories/:id
router.get('/:id', categoriesController.findOne)


//3. Create a new category
//POST localhost:8080/api/v1/categories
router.post('', categoriesController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/categories/:id
router.put('/:id', categoriesController.updateRecord)

//5. Delete a category
//DELETE localhost:8080/api/v1/categories/:id
router.delete('/:id', categoriesController.deleteRecord)

export default router