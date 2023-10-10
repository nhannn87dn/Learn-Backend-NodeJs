import { NextFunction, Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

/**
 * Get All Categories
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoriesService.findAll();
      sendJsonSuccess(res)(categories);
    } catch (error) {
      next(error)
    }
}

/**
 * Get Category by ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const {id} = req.params;
     console.log('getCategoryById', id)
      const category = await categoriesService.findById(id);
      sendJsonSuccess(res)(category);
    } catch (error) {
      next(error)
    }
}

const create =  async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const payload = req.body;
    const category = await categoriesService.create(payload)
    sendJsonSuccess(res)(category);
  } catch (error) {
    next(error)
  }
}

const updateById =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload = req.body;
     const category = await categoriesService.updateById(id, payload);
     sendJsonSuccess(res)(category);
   } catch (error) {
     next(error)
   }
}

const deleteById =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
     const category = await categoriesService.deleteById(id);
     sendJsonSuccess(res)(category);
   } catch (error) {
     next(error)
   }
}

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};