import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import employeesTypeORMService from '../services/employeesTypeORM.service';

/**
 * Controller - Điều khiển
 * - Tiếp nhận req từ client
 * - Phản hồi lại res cho client
 */

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(
      'TypeORM Controller'
    );
    // destructure page and limit and set default values
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const employees = await employeesTypeORMService.getAllItems(page, limit);
    sendJsonSuccess(res)(employees); // Gọi hàm mà có truyền giá trị cho data
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeesTypeORMService.getItemById(req.params.id);
    sendJsonSuccess(res)(employee);
  } catch (error) {
    next(error);
  }
};


const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    


    const newEmployee = await employeesTypeORMService.createItem(payload);
    sendJsonSuccess(res)(newEmployee);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedEmployee = await employeesTypeORMService.updateItem(id, payload);
    sendJsonSuccess(res)(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeesTypeORMService.deleteItem(id);
    sendJsonSuccess(res)(deletedEmployee);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getItemById,
  updateItem,
  createItem,
  deleteItem
};