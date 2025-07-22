
import { Router } from 'express';
import staffController from '../../controllers/staff.controller';

const router = Router();

// Middleware for staff routes
import { routeStaffMiddleware } from '../../midlewares/routeStaff.middleware';
import { routeStaffMiddleware2 } from '../../midlewares/routeStaff2.middleware';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import staffValidation from '../../validations/staff.validation';
//router.use(routeStaffMiddleware);

// GET /api/v1/staffs
router.get('/', routeStaffMiddleware, routeStaffMiddleware2, staffController.findAll);

// GET /api/v1/staffs/:id
router.get('/:id',validateSchemaYup(staffValidation.findById), staffController.findById);

// POST /api/v1/staffs
router.post('/', validateSchemaYup(staffValidation.create), staffController.create);

// PUT /api/v1/staffs/:id
router.put('/:id', validateSchemaYup(staffValidation.updateById),staffController.updateById);

// DELETE /api/v1/staffs/:id
router.delete('/:id', staffController.deleteById);

export default router;
