import { Router } from 'express';
import userController from '../../controllers/user.controller';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import userValidation from '../../validations/user.validation';
import { authenticateToken, authRoles } from '../../midlewares/auth.middleware';


const router = Router();

router.use(authenticateToken);

// GET /api/v1/users
router.get('/',  userController.findAll);

router.get('/:id', authRoles(["admin"]),  validateSchemaYup(userValidation.findById), userController.findById);
//
// POST /api/v1/users
router.post('/', authRoles(["admin"]), validateSchemaYup(userValidation.create), userController.create);

// PUT /api/v1/users/:id
router.put('/:id', authRoles(["admin"]), validateSchemaYup(userValidation.updateById),userController.updateById);

// DELETE /api/v1/users/:id
router.delete('/:id', authRoles(["admin"]), validateSchemaYup(userValidation.deleteById), userController.deleteById);

export default router;
