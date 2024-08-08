import express from 'express';
import authController from '../../controllers/auth.controller';
const router = express.Router()

//POST v1/auth/login
router.post('/login', authController.login)

export default router