import express from 'express';
import type { Router } from 'express';
import staffsController from '../../controllers/staffs.controller';
import { authenticateToken, authorize } from '../../middlewares/auth.middleware';
const router: Router = express.Router();

// GET /api/v1/staffs
router.get('/', staffsController.getAllStaff);
// GET /api/v1/staffs/:id
router.get('/:id', staffsController.getStaffById);
// POST /api/v1/staffs
router.post('/', authenticateToken, authorize(['admin']), staffsController.createStaff);
// PUT /api/v1/staffs/:id
router.put('/:id', authenticateToken, staffsController.updateStaffById);
// DELETE /api/v1/staffs/:id
router.delete('/:id', authenticateToken, staffsController.deleteStaffById);
export default router;
