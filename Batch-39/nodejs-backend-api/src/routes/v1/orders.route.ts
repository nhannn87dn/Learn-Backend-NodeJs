import express from 'express'
import ordersController from '../../controllers/orders.controller'
import { checkOrderToken } from '../../middlewares/order.middleware'
const router = express.Router()

//1. Get All Brands
//GET localhost:8080/api/v1/orders
router.get('', ordersController.findAll)

//2. Get One Category
//GET localhost:8080/api/v1/orders/:id
router.get('/:id', ordersController.findById)


//3. Create a new category
// Có thể truyền hoặc ko truyền token
//POST localhost:8080/api/v1/orders
router.post('',  checkOrderToken, ordersController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/orders/:id
router.put('/:id', ordersController.updateById)

//5. Delete a category
//DELETE localhost:8080/api/v1/orders/:id
router.delete('/:id', ordersController.deleteById)

export default router