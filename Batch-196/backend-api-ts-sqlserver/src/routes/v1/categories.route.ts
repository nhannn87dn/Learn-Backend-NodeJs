import express from 'express';
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource categories
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/categories
router.get('/', categoriesController.findAll);
// GET /api/v1/categories/:id
router.get('/:id', categoriesController.findById)
// POST /api/v1/categories
router.post('/', categoriesController.create);
// PUT /api/v1/categories/:id
router.put('/:id', categoriesController.update);
// DELETE /api/v1/categories/:id
router.delete('/:id', categoriesController.remove);

export default router;