import {Request, Response} from "express";
import fs from "node:fs";
import path from "node:path";

type Student = {
  id: number;
  name: string;
  age: number;
  email: string;
};
// Sử dụng path.join để tạo đường dẫn đến file students.json
const studentsFilePath = path.join(__dirname, "../database/students.json");
// sử dụng module fs để đọc dữ liệu từ file students.json
const data = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8")) as Student[];


const getAllStudents = (req: Request, res: Response) => {
  //trả về dữ liệu đã đọc từ file students.json
  res.status(200).json(data);
}

const getStudentById = (req: Request, res: Response) => {
  //Logic xử lý tìm kiếm student theo id
  const studentId = Number(req.params.id);
  const student = data.find((item) => item.id === studentId);

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  res.status(200).json(student);
}

export default {
  getAllStudents,
    getStudentById
}