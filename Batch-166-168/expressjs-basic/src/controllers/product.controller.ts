import productService from "../services/product.service";
import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const result = await productService.findAll(query);
      sendJsonSuccess(res)(result);
      
    } catch (error) {
      next(error);
    }
};

const findOne =  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const result = await productService.findOne(id);
      sendJsonSuccess(res)(result);
      
    } catch (error) {
      next(error);
    }
};

const create =  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const result = await productService.create(req.body);
      sendJsonSuccess(res, SUCCESS.CREATED)(result);
      
    } catch (error) {
      next(error);
    }
};

const updateById =  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.updateById(req.params.id, req.body);
      sendJsonSuccess(res)(result);
      
    } catch (error) {
      next(error);
    }
};
  
const deleteById =  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.deleteById(req.params.id);
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
    deleteById
}