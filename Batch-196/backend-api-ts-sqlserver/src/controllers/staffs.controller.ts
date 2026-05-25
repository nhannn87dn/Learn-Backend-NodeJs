import type { Request, Response, NextFunction } from 'express';
import staffsService from '../services/staffs.service';
import { UpdateStaffDto } from '../types/staff.type';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staffs = await staffsService.findAll(req.query);
    sendJsonSuccess({ res, data: staffs });
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const staff = await staffsService.getByIdOrFail(id);
    sendJsonSuccess({ res, data: staff });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createStaffDto = req.body;
    const newStaff = await staffsService.create(createStaffDto);
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newStaff });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const updateStaffDto = req.body as UpdateStaffDto;
    const updatedStaff = await staffsService.updateById(id, updateStaffDto);
    sendJsonSuccess({ res, data: updatedStaff });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const staff = await staffsService.deleteById(id);
    sendJsonSuccess({ res, data: staff });
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
