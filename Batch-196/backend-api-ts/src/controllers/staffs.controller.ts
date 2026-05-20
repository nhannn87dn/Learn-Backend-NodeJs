import type { Request, Response } from 'express';
import staffsService from '../services/staffs.service';
import { UpdateStaffDto } from '../types/staff.type';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response) => {
  const staffs = await staffsService.findAll(req.query);
  sendJsonSuccess({ res, data: staffs });
};

const findById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const staff = await staffsService.getByIdOrFail(id);
  sendJsonSuccess({ res, data: staff });
};

const create = async (req: Request, res: Response) => {
  const createStaffDto = req.body;
  const newStaff = await staffsService.create(createStaffDto);
  sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newStaff });
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updateStaffDto = req.body as UpdateStaffDto;
  const updatedStaff = await staffsService.updateById(id, updateStaffDto);
  sendJsonSuccess({ res, data: updatedStaff });
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const staff = await staffsService.deleteById(id);
  sendJsonSuccess({ res, data: staff });
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
