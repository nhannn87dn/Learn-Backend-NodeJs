import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import productsService from '../services/products.service';

/**
 * Controller - Điều khiển
 * - Tiếp nhận req từ client
 * - Phản hồi lại res cho client
 */

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Lấy số trang hiện tại từ URL xuống
    const page = req.query.page ?  parseInt(req.query.page as string) :  1; //Mặc định lấy page = 1
    const limit = req.query.limit ?  parseInt(req.query.limit as string) :  10; //Mặc định 10 items/1 page

    const products = await productsService.getAllItems(page,limit);
    sendJsonSuccess(res)(products); // Gọi hàm mà có truyền giá trị cho data
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsService.getItemById(req.params.id);
    sendJsonSuccess(res)(product);
  } catch (error) {
    next(error);
  }
};

const getItemBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsService.getItemBySlug(req.params.slug);
    sendJsonSuccess(res)(product);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newProduct = await productsService.createItem(payload);
    sendJsonSuccess(res)(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedProduct = await productsService.updateItem(id, payload);
    sendJsonSuccess(res)(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteItem(id);
    sendJsonSuccess(res)(deletedProduct);
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
  getItemBySlug
};