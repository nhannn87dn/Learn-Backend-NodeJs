import {Request, Response} from "express";
import studentsService from "../services/students.service";

const getAllStudents = async (req: Request, res: Response) => {
  //trả về dữ liệu đã đọc từ file students.json
  const students = await studentsService.getAllStudents();
  res.status(200).json(students);
}

const getStudentById = async (req: Request, res: Response) => {
  //Logic xử lý tìm kiếm student theo id
  const studentId = Number(req.params.id);
  //Lấy student từ service
  const student = await studentsService.getStudentById(studentId);
  res.status(200).json(student);
}

const createStudent = async(req: Request, res: Response) => {
  const newStudent = await studentsService.createStudent(req.body);
  res.status(201).json(newStudent);
};

const updateStudentById = async(req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  const updatedStudent = await studentsService.updateStudentById(studentId, req.body);
  res.status(200).json(updatedStudent);
};

const deleteStudentById = async(req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  const deletedStudent = await studentsService.deleteStudentById(studentId);  
  res.status(200).json(deletedStudent);
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
};