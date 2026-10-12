import express, { Router } from "express";
import authController from "../../controllers/auth.controller";

const router: Router = express.Router();

// GET /api/v1/auth/login - login route
router.post("/login", authController.login);

export default router;