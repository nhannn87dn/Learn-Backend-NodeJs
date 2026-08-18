import express from 'express';
import staffsController from '../../controllers/staffs.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import staffSchemaValidation from '../../validations/staff.validation';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();

// GET /api/v1/staffs
router.get('/', authenticateToken, validateSchema(staffSchemaValidation.getAllStaffs), staffsController.getAllStaffs);
// GET /api/v1/staffs/:id
router.get('/:id', authenticateToken, validateSchema(staffSchemaValidation.getStaffById), staffsController.getStaffById);
// POST /api/v1/staffs
router.post('/', validateSchema(staffSchemaValidation.createStaff), staffsController.createStaff);
// PUT /api/v1/staffs/:id
router.put('/:id', validateSchema(staffSchemaValidation.updateStaff), staffsController.updateStaffById);
// DELETE /api/v1/staffs/:id
router.delete('/:id', validateSchema(staffSchemaValidation.deleteStaffById), staffsController.deleteStaffById);

export default router;