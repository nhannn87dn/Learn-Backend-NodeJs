import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
//import categoriesTypeORMService from '../services/categories.service';
import categoriesTypeORMService from '../services/categoriesTypeORM.service';

/**
 * Controller - Điều khiển
 * - Tiếp nhận req từ client
 * - Phản hồi lại res cho client
 */

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // destructure page and limit and set default values
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const categories = await categoriesTypeORMService.getAllItems(page, limit);
    sendJsonSuccess(res)(categories); // Gọi hàm mà có truyền giá trị cho data
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await categoriesTypeORMService.getItemById(parseInt(req.params.id));
    sendJsonSuccess(res)(product);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newCategory = await categoriesTypeORMService.createItem(payload);
    sendJsonSuccess(res)(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedCategory = await categoriesTypeORMService.updateItem(parseInt(id), payload);
    sendJsonSuccess(res)(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoriesTypeORMService.deleteItem(parseInt(id));
    sendJsonSuccess(res)(deletedCategory);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};