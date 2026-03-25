import type { Request, Response, NextFunction } from 'express';
import productsService from '../services/products.service';
import { ERROR, sendJsonError, sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

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
  const { id } = req.params;
  if(!id) {
     sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
      });
    }
   //id is string
  console.log(typeof id);
  try {
    const product = await productsService.getProductById(String(id));
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
  if(!id) {
     sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
     });
    }
  const payload = req.body;
  try {
    const updatedProduct = await productsService.updateProductById(String(id), payload);
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
  if(!id) {
     sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
     });
    }
  try {
    const deletedProduct = await productsService.deleteProductById(String(id));
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getRecommendProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const products = await productsService.getRecommendProduct(req.query);
        sendJsonSuccess({
            res,
            status: SUCCESS.OK,
            data: products
        })
    } catch (error) {
        next(error);
    }
}

const getSaleProductByCategory = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const {catId=''} = req.params;
    const limit = req.query.limit || 5;
   
    const products = await productsService.getSaleProductByCategory(String(catId), parseInt(limit as string));
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: products
    })
  } catch (error) {
    next(error);
  }
}

export default {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct,
  getRecommendProduct,
  getSaleProductByCategory
};
