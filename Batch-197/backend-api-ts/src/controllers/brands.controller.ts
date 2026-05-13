import type { Request, Response } from "express";
import brandsService from "../services/brands.service";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

/*
 Get all brands
*/
const findAll = async (req: Request, res: Response) => {
  const data = await brandsService.findAll();
  res.json(data);
};

/*
 Get brand by id
*/
const findById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const brand = await brandsService.getByIdOrFail(id);
  res.json(brand);
};

//create new brand
const create = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newBrand = await brandsService.create(name, description);
  res.status(201).json(newBrand);
};

//update brand by id
const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name, description } = req.body;
  const brand = await brandsService.updateById(id, name, description);
  res.json(brand);
};

//delete brand by id
const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const brand = await brandsService.deleteById(id);
  res.status(204).json(brand);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};