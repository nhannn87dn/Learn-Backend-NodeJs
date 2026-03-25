import type { Request, Response, NextFunction } from 'express';
import brandService from '../services/brand.service';
import { ERROR, sendJsonError, sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await brandService.getAllBrands();
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; //id is string
  console.log(typeof id);

  if(!id) {
    return sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
    });
  }

  try {
    const brand = await brandService.getBrandById(String(id));
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log('<<=== 🚀 payload ===>>', payload);
  try {
    const newBrand = await brandService.createBrand(payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.CREATED,
      data: newBrand,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrandById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if(!id) {
    return sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
    });
  }

  const payload = req.body;
  try {
    const updatedBrand = await brandService.updateBrandById(String(id), payload);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: updatedBrand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrandById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) {
    return sendJsonError({
      res,
      status: ERROR.BAD_REQUEST,
    });
  }
  try {
    const deletedBrand = await brandService.deleteBrandById(String(id));
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedBrand,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
  createBrand,
};
