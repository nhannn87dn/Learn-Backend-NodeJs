import type { Request, Response, NextFunction } from 'express';
import productsService from '../services/products.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //example uri: /api/products?page=1&limit=10
    const data = await productsService.getAllProducts(req.query);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; //id is string
  console.log(typeof id);
  try {
    const product = await productsService.getProductById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log('<<=== 🚀 payload ===>>', payload);
  try {
    const newProduct = await productsService.createProduct(payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.CREATED,
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedProduct = await productsService.updateProductById(id, payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productsService.deleteProductById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct,
};
