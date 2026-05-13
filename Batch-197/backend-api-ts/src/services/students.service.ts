import createError from "http-errors";
import Student from "../models/student.model";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

const students = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 20 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 22 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 21 },
];

const findAll = async () => {
    const data = await Student.find();
  return data;
};

const getByIdOrFail = async (id: string) => {
  const student = students.find((s) => s.id === parseInt(id)); 
    if (!student) {
        throw createError(404, 'Student not found');
    }
    return student;
}

const create = async (name: string, email: string, age: number) => {
    // const newStudent = {
    //     id: students.length + 1,
    //     name,
    //     email,
    //     age
    // };
    // students.push(newStudent);
    //create new student in database
    const newStudent = new Student({
        name,
        email,
        age
    });
    const result = await newStudent.save();
    return result;
};

const updateById = async (id: string, name: string, email: string, age: number) => {
    //step 1: check if student exists
    const student =  await getByIdOrFail(id);
    //step 2: if exist,then update the fields
    student.name = name;
    student.email = email;
    student.age = age;
    return student;
};

const deleteById = async (id: string) => {
    //step 1: check if student exists
    const student = await getByIdOrFail(id);
    //step 2: if exist, then remove it
    const index = students.indexOf(student);
    students.splice(index, 1);
    return student;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};