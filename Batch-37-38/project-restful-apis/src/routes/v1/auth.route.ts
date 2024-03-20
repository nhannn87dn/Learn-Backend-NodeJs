import express, { Express } from 'express';
const router: Express = express();
import authController from '../../controllers/auth.controller';

//http://localhost:8080/api/v1/auth
router.post('/', authController.authLogin);

export default router;
