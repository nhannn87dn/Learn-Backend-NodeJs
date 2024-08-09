import express from 'express';
import authController from '../../controllers/auth.controller';
import validateSchemaYup from '../../middlewares/validateSchemaYup.middleware'
import authValidations from '../../validations/authYup.validation'

const router = express.Router()

//POST v1/auth/login
router.post('/login', validateSchemaYup(authValidations.loginSchema), authController.login)

export default router