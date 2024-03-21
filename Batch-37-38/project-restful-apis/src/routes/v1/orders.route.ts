import express from "express";
import ordersController from "../../controllers/orders.controller";
import { authenticateToken, authorize } from "../../middlewares/auth.middleware";
const router   = express.Router();

//Dinh nghia cac routes cho resource 

//Get All
//http://localhost:8080/api/v1/orders
router.get('',  ordersController.getAll)

//Get By ID
//http://localhost:8080/api/v1/orders/:id
router.get('/:id',  ordersController.getOrderById)


//Create category 
///http://localhost:8080/api/v1/orders
router.post('',  ordersController.createOrder)

//Update category By ID
///http://localhost:8080/api/v1/orders/:id
router.put('/:id', ordersController.updateOrder)

//Delete category By ID
///http://localhost:8080/api/v1/orders/:id
//Chỉ chó phép role = admin moi xoa dc
router.delete('/:id',authenticateToken, authorize(['admin', 'subAdmin']), ordersController.deleteOrder)

export default router