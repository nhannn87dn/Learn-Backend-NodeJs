import express from "express"
import authController from '../../controllers/auth.controller'
import { authenticateToken } from "../../middlewares/auth.middleware";
const router  = express.Router();

/**
 * localhost:8080/api/v1/auth
 */
router.post('/login', authController.login);
/**
 * localhost:8080/api/v1/auth/refresh-token
 */
router.post('/refresh-token', authenticateToken, authController.reFreshToken);

/**
 * localhost:8080/api/v1/auth/profile
 */
router.post('/profile', authenticateToken, authController.profile);

export default router