import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import { authenticateToken } from '../../middleware/auth.middleware';
const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource categories
- Gắn controller tương ứng với từng endpoint
*/

/** PUBLIC ROUTE FOR CLIENT */

//Get categories tree for client
router.get('/tree', categoriesController.findAllTree);


/** PRIVATE ROUTE FOR DASHBOARD */

// GET /api/v1/categories
router.get('/', authenticateToken, categoriesController.findAll);
// GET /api/v1/categories/:id
router.get('/:id', authenticateToken, categoriesController.findById)
// POST /api/v1/categories
router.post('/', authenticateToken, categoriesController.create);
// PUT /api/v1/categories/:id
router.put('/:id', authenticateToken, categoriesController.update);
// DELETE /api/v1/categories/:id
router.delete('/:id', authenticateToken, categoriesController.remove);

export default router;