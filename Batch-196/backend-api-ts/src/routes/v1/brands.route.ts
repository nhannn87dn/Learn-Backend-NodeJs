import express from 'express';
import brandsController from '../../controllers/brands.controller';
const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource brands
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/brands
router.get('/', brandsController.findAll);
// GET /api/v1/brands/:id
router.get('/:id', brandsController.findById)
// POST /api/v1/brands
router.post('/', brandsController.create);
// PUT /api/v1/brands/:id
router.put('/:id', brandsController.update);
// DELETE /api/v1/brands/:id
router.delete('/:id', brandsController.remove);

export default router;