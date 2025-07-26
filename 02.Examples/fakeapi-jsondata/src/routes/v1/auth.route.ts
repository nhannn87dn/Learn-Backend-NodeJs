import express from 'express';
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../midlewares/auth.middleware';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import { loginValidationSchema } from '../../validations/auth.validation';

const router = express.Router();

router.post('/login', validateSchemaYup(loginValidationSchema), authController.login)
router.post('/refresh-token', authenticateToken, authController.refreshToken)
router.get('/profile', authenticateToken, authController.getProfile)

export default router;