import type { Request, Response } from "express";
import categoriesService from "../services/categories.service";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

/*
 Get all categories
*/
const findAll = async (req: Request, res: Response) => {
  const data = await categoriesService.findAll();
  res.json(data);
};

/*
 Get category by id
*/
const findById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await categoriesService.getByIdOrFail(id);
  res.json(category);
};

//create new category
const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newCategory = await categoriesService.create(name);
  res.status(201).json(newCategory);
};

//update category by id
const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name } = req.body;
  const category = await categoriesService.updateById(id, name);
  res.json(category);
};

//delete category by id
const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await categoriesService.deleteById(id);
  res.status(204).json(category);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
