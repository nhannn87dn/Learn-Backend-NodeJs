import { NextFunction, Request, Response } from "express";
import staffService from "../services/staff.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
/* get ALl staffs */
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staffs = await staffService.findAll();
    sendJsonSuccess(res)(staffs);
    
  } catch (error) {
    next(error);
  }
};

/* get Single Staff */
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const staff = await staffService.findOne(id);
    // response cho client
    //res.status(200).json(staff);
    sendJsonSuccess(res)(staff);
  } catch (error) {
    //chuyen tiep loi ra cho app.ts xu ly
    next(error);
  }
};

/* create a new staff */
const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log('<<=== 🚀 create staff ===>>');
  try {
    const body = req.body;
    //Theem vao database
    const staff = await staffService.create(body);

    //res.status(201).json(staff);
    sendJsonSuccess(res, SUCCESS.CREATED)(staff);
  } catch (error) {
    next(error);
  }
};

/* update a staff */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);
    const body = req.body;

    const staff = await staffService.updateById(id, body);

    //res.status(200).json(staff);
    sendJsonSuccess(res)(staff);
  } catch (error) {
    next(error);
  }
};

/* delete a staff */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // type string
    console.log("<<=== 🚀 id ===>>", id);

    const result = await staffService.deleteById(id);

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
