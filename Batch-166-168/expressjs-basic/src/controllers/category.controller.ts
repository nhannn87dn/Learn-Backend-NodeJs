import { NextFunction, Request, Response } from "express";
import categoryService from "../services/category.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
/* get ALl categories */
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.findAll();
    sendJsonSuccess(res)(categories);
    
  } catch (error) {
    next(error);
  }
};

/* get Single Category */
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const category = await categoryService.findOne(id);
    // response cho client
    //res.status(200).json(category);
    sendJsonSuccess(res)(category);
  } catch (error) {
    //chuyen tiep loi ra cho app.ts xu ly
    next(error);
  }
};

/* create a new category */
const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log('<<=== 🚀 create category ===>>');
  try {
    const body = req.body;
    //Theem vao database
    const category = await categoryService.create(body);

    //res.status(201).json(category);
    sendJsonSuccess(res, SUCCESS.CREATED)(category);
  } catch (error) {
    next(error);
  }
};

/* update a category */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);
    const body = req.body;

    const category = await categoryService.updateById(id, body);

    //res.status(200).json(category);
    sendJsonSuccess(res)(category);
  } catch (error) {
    next(error);
  }
};

/* delete a category */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const result = await categoryService.deleteById(id);

    //res.status(200).json(result);
    sendJsonSuccess(res)(result);
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};
