import type { Request, Response, NextFunction } from 'express';
import categoryService from '../services/categories.service';
import { ERROR, sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

/* Danh cho public route */
const getCategoriesTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoryService.getCategoriesTree();
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  }
    catch (error) {
    next(error);
  }
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoryService.getAllCategories();
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { id } = req.params; //id is string
    if(!id) {
      return res.status(ERROR.BAD_REQUEST).json({
        success: false,
        message: 'Category ID is required',
      });
    }
    const category = await categoryService.getCategoryById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log('<<=== 🚀 payload ===>>', payload);
  try {
    const newCategory = await categoryService.createCategory(payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.CREATED,
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedCategory = await categoryService.updateCategoryById(id, payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.deleteCategoryById(id);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  createCategory,
  getCategoriesTree,
};
