import express, { Router } from "express";

const router: Router = express.Router();

// GET /api/students
router.get("/", (req, res) => {
  res.status(200).json({ message: "List of students" });
});

export default router;