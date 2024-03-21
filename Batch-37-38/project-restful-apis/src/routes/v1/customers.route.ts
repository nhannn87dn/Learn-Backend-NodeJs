import express from "express";
import customersController from "../../controllers/customers.controller";
import { authenticateToken, authorize } from "../../middlewares/auth.middleware";
const router   = express.Router();

//Dinh nghia cac routes cho resource 

//Get All
//http://localhost:8080/api/v1/customers
router.get('',  customersController.getAll)

//Get By ID
//http://localhost:8080/api/v1/customers/:id
router.get('/:id',  customersController.getCustomerById)


//Create category 
///http://localhost:8080/api/v1/customers
router.post('',  customersController.createCustomer)

//Update category By ID
///http://localhost:8080/api/v1/customers/:id
router.put('/:id', customersController.updateCustomer)

//Delete category By ID
///http://localhost:8080/api/v1/customers/:id
//Chỉ chó phép role = admin moi xoa dc
router.delete('/:id',authenticateToken, authorize(['admin', 'subAdmin']), customersController.deleteCustomer)

export default router