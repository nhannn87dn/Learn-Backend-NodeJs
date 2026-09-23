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
let data = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8")) as Student[];

const saveStudents = () => {
  fs.writeFileSync(studentsFilePath, JSON.stringify(data, null, 2), "utf-8");
};

const getAllStudents = async () => {
  //trả về dữ liệu đã đọc từ file students.json
  return data;
}

const getStudentById = async (id: number) => {
    //Logic xử lý tìm kiếm student theo id
    //Tìm trong danh sách data xem có student nào có id trùng với studentId không
      const student = data.find((item) => item.id === id);
      // nếu ko có thì trả về 404
      if (!student) {
        throw new Error("Student not found");
      }
      return student;
}

const createStudent = async(payload: Partial<Student>) => {
    const { name, age, email } = payload;
    
      if (!name || typeof age !== "number" || !email) {
        throw new Error("Invalid student data");
      }
    
      const newStudent: Student = {
        //lấy id tăng lên 1 so với id lớn nhất
        id: data.length > 0 ? Math.max(...data.map((student) => student.id)) + 1 : 1,
        name,
        age,
        email,
      };
    
      data.push(newStudent);
      saveStudents();
      return newStudent;
}

const updateStudentById = async (id: number, payload: Partial<Student>)=>{
    const studentIndex = data.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    throw new Error("Student not found");
    return;
  }

  const currentStudent = data[studentIndex]!;
  const updates = payload as Partial<Student>;
  const hasInvalidName = updates.name !== undefined && typeof updates.name !== "string";
  const hasInvalidAge = updates.age !== undefined && typeof updates.age !== "number";
  const hasInvalidEmail = updates.email !== undefined && typeof updates.email !== "string";

  if (
    Object.keys(updates).length === 0 ||
    hasInvalidName ||
    hasInvalidAge ||
    hasInvalidEmail
  ) {
    throw new Error("Invalid student data");
  }

  const updatedStudent: Student = {
    ...currentStudent,
    ...updates,
    id: id,
  };
  data[studentIndex] = updatedStudent;
  saveStudents();
  return updatedStudent;
}

const deleteStudentById = async (id: number) => {
    const studentIndex = data.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    throw new Error("Student not found");
  }

  const [deletedStudent] = data.splice(studentIndex, 1);
  saveStudents();
  return deletedStudent;
}

export default {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentById,
    deleteStudentById,
}