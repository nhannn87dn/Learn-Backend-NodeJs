import { NextFunction, Request, Response } from "express";
import brandService from "../services/brand.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
/* get ALl brands */
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await brandService.findAll();
    sendJsonSuccess(res)(brands);
   
  } catch (error) {
    next(error);
  }
};

/* get Single Brand */
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const brand = await brandService.findOne(id);
    // response cho client
    //res.status(200).json(brand);
    sendJsonSuccess(res)(brand);
  } catch (error) {
    //chuyen tiep loi ra cho app.ts xu ly
    next(error);
  }
};

/* create a new brand */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    //Theem vao database
    const brand = await brandService.create(body);

    //res.status(201).json(brand);
    sendJsonSuccess(res, SUCCESS.CREATED)(brand);
  } catch (error) {
    next(error);
  }
};

/* update a brand */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);
    const body = req.body;

    const brand = await brandService.updateById(id, body);

    //res.status(200).json(brand);
    sendJsonSuccess(res)(brand);
  } catch (error) {
    next(error);
  }
};

/* delete a brand */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const result = await brandService.deleteById(id);

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
