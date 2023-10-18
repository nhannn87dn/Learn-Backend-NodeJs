import express, { Express} from 'express';
import employeesController from '../controllers/employees.controller';
import {authenticateToken} from '../middleware/auth.middleware';
import { validateSchema } from '../middleware/validateSchema.middleware';
import employeeSchema from '../validations/employees.validation'
const router: Express = express();

/**
 * Get All Records
 * [GET] /api/v1/employees 
 * 
 */
router.get('/', employeesController.getAll);
  
/**
 * Get a Record by ID
 * [GET] /api/v1/employees/:id
 * 
 */
router.get('/:id', authenticateToken, validateSchema(employeeSchema.getById), employeesController.getById);

/**
 * Create a new Record
 * [GET] /api/v1/employees/
 * 
 */
router.post('/', employeesController.create);


/**
 * Update a Record by ID
 * [GET] /api/v1/employees/:id
 * 
 */
router.patch('/:id', authenticateToken,  employeesController.updateById);

/**
 * De;ete a Record by ID
 * [GET] /api/v1/employees/:id
 * 
 */
router.delete('/:id', authenticateToken,  employeesController.deleteById);


export default router;
