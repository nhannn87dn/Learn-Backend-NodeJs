import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import customersService from '../services/customers.service';

/**
 * Controller - Điều khiển
 * - Tiếp nhận req từ client
 * - Phản hồi lại res cho client
 */

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await customersService.getAllItems();
    sendJsonSuccess(res)(customers); // Gọi hàm mà có truyền giá trị cho data
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await customersService.getItemById(req.params.id);
    sendJsonSuccess(res)(customer);
  } catch (error) {
    next(error);
  }
};


const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newCustomer = await customersService.createItem(payload);
    sendJsonSuccess(res)(newCustomer);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedCustomer = await customersService.updateItem(id, payload);
    sendJsonSuccess(res)(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await customersService.deleteItem(id);
    sendJsonSuccess(res)(deletedCustomer);
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