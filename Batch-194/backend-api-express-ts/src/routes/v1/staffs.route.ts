import express, { Router } from 'express';
import staffsController from '../../controllers/staffs.controller';
import { authenticateToken, authorize } from '../../middleware/auth.middleware';

const router = express.Router() as Router;

// GET api/v1/staffs ==> get all staffs
router.get('/', authenticateToken, staffsController.findAll);
// GET api/v1/staffs/:id ==> get staff by id
router.get('/:id', authenticateToken, staffsController.findById);
// POST api/v1/staffs ==> create new staff
router.post('/', authenticateToken, staffsController.create);
// PUT api/v1/staffs/:id ==> Update a staff
// user nào có role nằm trong mảng thì mới có quyền
router.put('/:id', authenticateToken, authorize(['admin']), staffsController.updateById);
// DELETE api/v1/staffs/:id ==> Delete a staff by id
router.delete('/:id', authenticateToken, authorize(['admin']), staffsController.deleteById);

export default router;

