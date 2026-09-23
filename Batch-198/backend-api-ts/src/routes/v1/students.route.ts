import express, { Router } from "express";
import studentsController from "../../controllers/students.controller";
const router: Router = express.Router();
// GET /api/v1/students - get All Students
router.get("/", studentsController.getAllStudents);
// GET /api/v1/students/:id - get Student by ID
router.get("/:id", studentsController.getStudentById);
// POST /api/v1/students - create a new student
router.post("/", studentsController.createStudent);
// PUT /api/v1/students/:id - update a student by ID
router.put("/:id", studentsController.updateStudentById);
// DELETE /api/v1/students/:id - delete a student by ID
router.delete("/:id", studentsController.deleteStudentById);

export default router;