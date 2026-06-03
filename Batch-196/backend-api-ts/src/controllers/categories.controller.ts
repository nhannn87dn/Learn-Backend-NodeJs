import type { Request, Response, NextFunction } from "express";
import categoriesService from "../services/categories.service";
import { UpdateCategoryDto } from "../types/category.type";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

//Get categories tree for client
const findAllTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoriesService.findAllTree();
    sendJsonSuccess({ res, data });
  } catch (error) {
    next(error);
  }
};


/*
 Get all categories
*/
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoriesService.findAll();
    sendJsonSuccess({ res, data });
  } catch (error) {
    next(error);
  }
};

/*
 Get category by id
*/
const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const category = await categoriesService.getByIdOrFail(id);
    sendJsonSuccess({ res, data: category });
  } catch (error) {
    next(error);
  }
};


//create new category
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCategoryDto = req.body;
    const newCategory = await categoriesService.create(createCategoryDto);
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newCategory });
  } catch (error) {
    next(error);
  }
};

//update category by id
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const updateCategoryDto = req.body as UpdateCategoryDto;
    const category = await categoriesService.updateById(id, updateCategoryDto);
    sendJsonSuccess({ res, data: category });
  } catch (error) {
    next(error);
  }
};

//delete category by id
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const category = await categoriesService.deleteById(id);
    sendJsonSuccess({ res, data: category });
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
  findAllTree
};
