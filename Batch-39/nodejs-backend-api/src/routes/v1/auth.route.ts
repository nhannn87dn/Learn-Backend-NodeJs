import express from 'express';
import authController from '../../controllers/auth.controller';
import validateSchemaYup from '../../middlewares/validateSchemaYup.middleware'
import authValidations from '../../validations/authYup.validation'
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = express.Router()

//POST v1/auth/login
router.post('/login', authController.login)

router.get('/profile', authenticateToken, authController.profile )

router.post('/refresh-token', authenticateToken, authController.refreshToken)

export default router