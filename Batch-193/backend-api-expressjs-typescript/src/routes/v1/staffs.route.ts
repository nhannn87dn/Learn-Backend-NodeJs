import { Router } from 'express';
import staffController from '../../controllers/staff.controller';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import staffValidation from '../../validations/staff.validation';
import { authenticateToken, authRoles } from '../../midlewares/auth.middleware';


const router = Router();

//router.use(authenticateToken);

// GET /api/v1/staffs
router.get('/',  staffController.findAll);

// GET /api/v1/staffs/:id
//router.get('/:id', authenticateToken, authRoles(["admin"]),  validateSchemaYup(staffValidation.findById), staffController.findById);
router.get('/:id', authRoles(["admin"]),  validateSchemaYup(staffValidation.findById), staffController.findById);
//
// POST /api/v1/staffs
router.post('/', validateSchemaYup(staffValidation.create), staffController.create);

// PUT /api/v1/staffs/:id
router.put('/:id', validateSchemaYup(staffValidation.updateById),staffController.updateById);

// DELETE /api/v1/staffs/:id
router.delete('/:id', authRoles(["admin"]), validateSchemaYup(staffValidation.deleteById), staffController.deleteById);

// POST /api/v1/staffs/:id/roles
router.post('/:id/roles',  validateSchemaYup(staffValidation.addRole), staffController.addRole);

// DELETE /api/v1/staffs/:id/roles
router.delete('/:id/roles',validateSchemaYup(staffValidation.removeRole), staffController.removeRole);

export default router;
