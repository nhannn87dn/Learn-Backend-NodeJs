import express from 'express';
import type { Router } from 'express';
import authController from '../../controllers/auth.controller';
const router: Router = express.Router();


//POST /api/v1/auth/login
router.post('/login', authController.login);

export default router;