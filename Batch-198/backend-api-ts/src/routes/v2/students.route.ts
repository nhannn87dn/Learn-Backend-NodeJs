import express, { Router } from "express";

const router: Router = express.Router();

// GET /api/v2/students - get All Students
router.get("/", (req, res) => {
  res.status(200).json({ message: "students" });
});

// GET /api/v2/students/:id - get Student by ID
router.get("/:id", (req, res) => {
    //Lấy id trong params của request
  const studentId = req.params.id;
  res.status(200).json({ message: `Details of student with ID: ${studentId}` });
});

// POST /api/v2/students - create a new student
router.post("/", (req, res) => {
  // Lấy dữ liệu từ body của request
  const newStudent = req.body;
  console.log('<<=== 🚀 newStudent ===>>',newStudent);
  //Thêm mới 1 cái gì thành công
  //trả về mã là 201
  res.status(201).json({ 
    message: "New student created", 
    student: newStudent 
    });
});

// PUT /api/v2/students/:id - update a student by ID
router.put("/:id", (req, res) => {
    // Lấy id trong params của request
  const studentId = req.params.id;
  // Lấy dữ liệu từ body của request để cập nhật
  const updatedStudent = req.body;
  res.status(200).json({ message: `Student with ID: ${studentId} updated`, student: updatedStudent });
});

// DELETE /api/v2/students/:id - delete a student by ID
router.delete("/:id", (req, res) => {
    // Lấy id trong params của request
  const studentId = req.params.id;
  res.status(200).json({ message: `Student with ID: ${studentId} deleted` });
});

export default router;