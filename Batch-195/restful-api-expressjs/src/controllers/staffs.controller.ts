import type { Request, Response, NextFunction } from 'express';
import staffService from '../services/staff.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const getAllStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //example uri: /api/staffs?page=1&limit=10&role=admin&active=true
    const data = await staffService.getAllStaff(req.query);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getStaffById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; //id is string
  console.log(typeof id);
  try {
    const staff = await staffService.getStaffById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log('<<=== 🚀 payload ===>>', payload);
  try {
    const newStaff = await staffService.createStaff(payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.CREATED,
      data: newStaff,
    });
  } catch (error) {
    next(error);
  }
};

const updateStaffById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedStaff = await staffService.updateStaffById(id, payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: updatedStaff,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStaffById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedStaff = await staffService.deleteStaffById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedStaff,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
  createStaff,
};
