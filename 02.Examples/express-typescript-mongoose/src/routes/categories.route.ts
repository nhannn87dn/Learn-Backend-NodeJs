import express, { Express} from 'express';
import categoriesController from '../controllers/categories.controller';
import {authenticateToken} from '../middleware/auth.middleware';
const router: Express = express();

/**
 * Get All Records
 * [GET] /api/v1/categories 
 * 
 */
router.get('/', categoriesController.getAll);
  
/**
 * Get a Record by ID
 * [GET] /api/v1/categories/:id
 * 
 */
router.get('/:id', categoriesController.getById);

/**
 * Create a new Record
 * [GET] /api/v1/categories/
 * 
 */
router.post('/', categoriesController.create);


/**
 * Update a Record by ID
 * [GET] /api/v1/categories/:id
 * 
 */
router.patch('/:id',categoriesController.updateById);

/**
 * Delete a Record by ID
 * [GET] /api/v1/categories/:id
 * 
 */
router.delete('/:id', authenticateToken,  categoriesController.deleteById);


export default router;