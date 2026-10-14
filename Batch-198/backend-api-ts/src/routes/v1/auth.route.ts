import express, { Router } from "express";
import authController from "../../controllers/auth.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router: Router = express.Router();

// GET /api/v1/auth/login - login route
router.post("/login", authController.login);

//GET /api/v1/auth/profile - profile route
router.get("/profile", authenticateToken, authController.profile);

export default router;