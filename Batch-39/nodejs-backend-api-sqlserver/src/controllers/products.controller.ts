import { Response, Request, NextFunction } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import productsService from '../services/products.service';
/* get All Product Controller */

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const products = await productsService.findAll(req.query);
    sendJsonSuccess(res)(products)
  } catch (error) {
    next(error)
  }
  
}

const findOne = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.findById(parseInt(id));
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}


const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
  try {
   
    const product = await productsService.create(req.body)
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.updateById(parseInt(id), req.body);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.deleteById(parseInt(id));
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

export default {
  findAll,
  findOne,
  createDocument,
  updateById,
  deleteById
}

