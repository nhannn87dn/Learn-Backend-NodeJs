import express from 'express';
import type { Router } from 'express';
import tasksController from '../../controllers/tasks.controller';
const router: Router = express.Router();

// GET /api/v1/tasks
router.get('/', tasksController.getAllTasks);
//GET /api/v1/tasks/:id
router.get('/:id', tasksController.getTaskById);
// POST /api/v1/tasks
router.post('/', tasksController.createTask);
// PUT /api/v1/tasks/:id
router.put('/:id', tasksController.updateTaskById);
// DELETE /api/v1/tasks/:id
router.delete('/:id', tasksController.deleteTaskById);

export default router;
