import express, { Router } from "express";
import studentsController from "../../controllers/students.controller";
import { routeLevelMiddlewareExample, routeLevelMiddlewareExample2 } from "../../middlewares/routeLevel.middleware";
import validateSchema from "../../middlewares/validateSchema.middleware";
import studentsValidation from "../../validations/students.validation";

const router: Router = express.Router();

//Gắp middleware vào trước các route
//router.use(routeLevelMiddlewareExample)


// GET /api/v1/students - get All Students
router.get("/", routeLevelMiddlewareExample, routeLevelMiddlewareExample2,  studentsController.getAllStudents);
// GET /api/v1/students/:id - get Student by ID
router.get("/:id", validateSchema(studentsValidation.getStudentById),   studentsController.getStudentById);
// POST /api/v1/students - create a new student
router.post("/", validateSchema(studentsValidation.createStudent), studentsController.createStudent);
// PUT /api/v1/students/:id - update a student by ID
router.put("/:id", studentsController.updateStudentById);
// DELETE /api/v1/students/:id - delete a student by ID
router.delete("/:id", studentsController.deleteStudentById);

export default router;