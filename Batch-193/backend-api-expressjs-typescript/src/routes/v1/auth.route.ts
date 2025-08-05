import express from 'express';
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../midlewares/auth.middleware';

const router = express.Router();


router.post('/login', authController.login)

router.post('/refresh-token', authenticateToken, authController.refreshToken)

router.get('/get-profile', authenticateToken, authController.getProfile)

export default router;