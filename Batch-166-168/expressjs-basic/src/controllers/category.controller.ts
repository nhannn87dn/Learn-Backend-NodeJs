import { NextFunction, Request, Response } from "express";
import categoryService from "../services/category.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
/* get ALl categories */
const findAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = categoryService.findAll();
    sendJsonSuccess(res)(categories);
    // res.status(200).json({
    //   success: true,
    //   message: "success",
    //   data: categories,
    // });
  } catch (error) {
    next(error);
  }
};

/* get Single Category */
const findOne = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const category = categoryService.findOne(parseInt(id));
    // response cho client
    //res.status(200).json(category);
    sendJsonSuccess(res)(category);
  } catch (error) {
    //chuyen tiep loi ra cho app.ts xu ly
    next(error);
  }
};

/* create a new category */
const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    //Theem vao database
    const category = categoryService.create(body);

    //res.status(201).json(category);
    sendJsonSuccess(res, SUCCESS.CREATED)(category);
  } catch (error) {
    next(error);
  }
};

/* update a category */
const updateById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);
    const body = req.body;

    const category = categoryService.updateById(parseInt(id), body);

    //res.status(200).json(category);
    sendJsonSuccess(res)(category);
  } catch (error) {
    next(error);
  }
};

/* delete a category */
const deleteById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const result = categoryService.deleteById(parseInt(id));

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
