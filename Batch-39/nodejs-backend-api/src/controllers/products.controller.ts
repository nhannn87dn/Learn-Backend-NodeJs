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

const findAllByCategorySlug = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {slug} = req.params;
    const products = await productsService.findAllByCategorySlug(slug);
    sendJsonSuccess(res)(products)
  } catch (error) {
    next(error)
  }
  
}

const findOne = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.findOne(id);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}


const findOneBySlug = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {slug} = req.params;

    const product = await productsService.findOneBySlug(slug);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}


const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
  try {
   
    const product = await productsService.createDocument(req.body)
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.updateById(id, req.body);
    sendJsonSuccess(res)(product)
  } catch (error) {
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;

    const product = await productsService.deleteById(id);
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
  deleteById,
  findAllByCategorySlug,
  findOneBySlug
}

