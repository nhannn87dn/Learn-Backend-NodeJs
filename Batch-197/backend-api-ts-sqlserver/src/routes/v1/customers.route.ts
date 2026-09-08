import express from 'express';
import customersController from '../../controllers/customers.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import customerSchemaValidation from '../../validations/customer.validation';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, validateSchema(customerSchemaValidation.getAllCustomers), customersController.getAllCustomers);
router.get('/:id', authenticateToken, validateSchema(customerSchemaValidation.getCustomerById), customersController.getCustomerById);
router.post('/', authenticateToken, validateSchema(customerSchemaValidation.createCustomer), customersController.createCustomer);
router.put('/:id', authenticateToken, validateSchema(customerSchemaValidation.updateCustomer), customersController.updateCustomerById);
router.delete('/:id', authenticateToken, validateSchema(customerSchemaValidation.deleteCustomerById), customersController.deleteCustomerById);

export default router;