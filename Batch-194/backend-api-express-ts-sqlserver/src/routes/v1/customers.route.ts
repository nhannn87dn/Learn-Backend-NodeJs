import express, { Router } from 'express';
import customersController from '../../controllers/customers.controller';

const router = express.Router() as Router;

//GET api/v1/customers ==> get all customers
router.get('/', customersController.findAll);
//GET api/v1/customers/:id ==> get customer by id
router.get('/:id', customersController.findById)
//POST api/v1/customers ==> create new customer
router.post('/', customersController.create)
//PUT api/v1/customers/:id ==> Update a customer
router.put('/:id', customersController.updateById)
//DELETE api/v1/customers/:id ==> Delete a customer by id
router.delete('/:id', customersController.deleteById)

export default router;
