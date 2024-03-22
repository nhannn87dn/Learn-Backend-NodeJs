import express, { Express } from 'express';
const router: Express = express();
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

//http://localhost:8080/api/v1/auth/login
router.post('/login', authController.authLogin);

//http://localhost:8080/api/v1/auth/refresh-token
router.post('/refresh-token', authenticateToken, authController.refreshToken);

//http://localhost:8080/api/v1/auth/profile
router.get('/profile', authenticateToken, authController.getProfile);


export default router;
