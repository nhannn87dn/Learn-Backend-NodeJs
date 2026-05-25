import express from 'express';
import staffsController from '../../controllers/staffs.controller';
import validateSchemaYup from '../../middleware/validateSchemaYup.middleware';
import {
  createStaffSchema,
  deleteStaffSchema,
  getAllStaffsSchema,
  getStaffByIdSchema,
  updateStaffSchema,
} from '../../validations/staff.validation';
import { authenticateToken, authorize } from '../../middleware/auth.middleware';

const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource staffs
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/staffs
router.get('/', authenticateToken, validateSchemaYup(getAllStaffsSchema), staffsController.findAll);

// GET /api/v1/staffs/:id
router.get('/:id', authenticateToken, validateSchemaYup(getStaffByIdSchema), staffsController.findById);

// POST /api/v1/staffs
router.post('/', authenticateToken, validateSchemaYup(createStaffSchema), staffsController.create);

// PUT /api/v1/staffs/:id
//Chỉ admin mới có quyền cập nhật thông tin staff
router.put('/:id', authenticateToken, authorize(['admin']), validateSchemaYup(updateStaffSchema), staffsController.update);

// DELETE /api/v1/staffs/:id
router.delete('/:id', authenticateToken, validateSchemaYup(deleteStaffSchema), staffsController.remove);

export default router;
