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

export default {
  findAll
}

