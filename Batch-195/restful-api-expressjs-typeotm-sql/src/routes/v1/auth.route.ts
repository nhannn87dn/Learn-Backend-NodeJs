import express from 'express';
import type { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
const router: Router = express.Router();


//POST /api/v1/auth/login
router.post('/login', authController.login);

router.post('/refresh-token', authenticateToken, authController.refreshToken);
router.get('/profile', authenticateToken, authController.getProfile);
//register, forgot password, reset password, logout, etc. có thể thêm sau nếu cần thiết

export default router;