import type { Request, Response, NextFunction } from 'express';
import brandService from '../services/brand.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

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
  try {
    const brand = await brandService.getBrandById(id);
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
  const payload = req.body;
  try {
    const updatedBrand = await brandService.updateBrandById(id, payload);
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
  try {
    const deletedBrand = await brandService.deleteBrandById(id);
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
