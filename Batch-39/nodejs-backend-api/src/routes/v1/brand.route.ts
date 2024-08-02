import express from 'express'
import brandsController from '../../controllers/brands.controller'
const router = express.Router()

//1. Get All Brands
//GET localhost:8080/api/v1/brands
router.get('', brandsController.findAll)

//2. Get One Category
//GET localhost:8080/api/v1/brands/:id
router.get('/:id', brandsController.findById)


//3. Create a new category
//POST localhost:8080/api/v1/brands
router.post('', brandsController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/brands/:id
router.put('/:id', brandsController.updateById)

//5. Delete a category
//DELETE localhost:8080/api/v1/brands/:id
router.delete('/:id', brandsController.deleteById)

export default router