import express from "express";
import authController from "../../controllers/auth.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import authValidation from "../../validations/auth.validation";
import {authenticateToken} from "../../middlewares/auth.middleware";

const router = express.Router();

router.post('/login', validateSchemaYup(authValidation.loginSchema), authController.login);
router.get('/get-profile', authenticateToken, authController.getProfile);

export default router;