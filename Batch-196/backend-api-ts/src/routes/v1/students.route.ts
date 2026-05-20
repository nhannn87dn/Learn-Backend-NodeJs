import express from 'express';
import studentsController from '../../controllers/students.controller';
const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource students
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/students
router.get('/', studentsController.findAll);
// GET /api/v1/students/:id
router.get('/:id', studentsController.findById)
// POST /api/v1/students
router.post('/', studentsController.create);
// PUT /api/v1/students/:id
router.put('/:id', studentsController.update);
// DELETE /api/v1/students/:id
router.delete('/:id', studentsController.remove);

export default router;