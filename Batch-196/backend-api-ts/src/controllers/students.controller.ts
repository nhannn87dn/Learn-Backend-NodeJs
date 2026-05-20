import type { Request, Response } from "express";
import studentsService from "../services/students.service";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

/*
 Get all students
*/
const findAll = async (req: Request, res: Response) => {
  const data = await studentsService.findAll();
  res.json(data);
};

/*
 Get student by id
*/
const findById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const student = await studentsService.getByIdOrFail(id);
  res.json(student);
};

//create new student
const create = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const newStudent = await studentsService.create(name, email, age);
  res.status(201).json(newStudent);
};

//update student by id
const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name, email, age } = req.body;
  const student = await studentsService.updateById(id, name, email, age);
  res.json(student);
};

//delete student by id
const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const student = await studentsService.deleteById(id);
  res.status(204).json(student);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};