import type { Request, Response, NextFunction } from "express";
import brandsService from "../services/brands.service";
import { UpdateBrandDto } from "../types/brand.type";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

/*
 Get all brands
*/
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await brandsService.findAll();
    sendJsonSuccess({ res, data });
  } catch (error) {
    next(error);
  }
};

/*
 Get brand by id
*/
const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const brand = await brandsService.getByIdOrFail(Number(id));
    sendJsonSuccess({ res, data: brand });
  } catch (error) {
    next(error);
  }
};

//create new brand
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createBrandDto = req.body;
    const newBrand = await brandsService.create(createBrandDto);
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newBrand });
  } catch (error) {
    next(error);
  }
};

//update brand by id
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const updateBrandDto = req.body as UpdateBrandDto;
    const brand = await brandsService.updateById(Number(id), updateBrandDto);
    sendJsonSuccess({ res, data: brand });
  } catch (error) {
    next(error);
  }
};

//delete brand by id
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const brand = await brandsService.deleteById(Number(id));
    sendJsonSuccess({ res, data: brand });
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};