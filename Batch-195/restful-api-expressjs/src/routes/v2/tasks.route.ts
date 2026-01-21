import express from 'express';
import type { Router } from 'express';

const router: Router = express.Router();

// GET /api/v1/tasks
router.get('/', (req, res) => {
  res.send('Get all tasks');
});

//GET /api/v1/tasks/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get task with ID: ${id}`);
});

// POST /api/v1/tasks
router.post('/', (req, res) => {
  res.send('Create a new task');
});

// PUT /api/v1/tasks/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Update task with ID: ${id}`);
});

// DELETE /api/v1/tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Delete task with ID: ${id}`);
});

export default router;
