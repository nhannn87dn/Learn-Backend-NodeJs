import express from 'express';
import authController from '../../controllers/auth.controller';
import authValidation from '../../validations/auth.validation';
import validateSchema from '../../middleware/validateSchema.middleware';

const router = express.Router();

//Login thì cần method POST
//localhost:8080/api/v1/auth/login
router.post('/login', validateSchema(authValidation.login), authController.login);

export default router;