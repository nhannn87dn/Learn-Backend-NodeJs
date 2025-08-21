
import { NextFunction, Request, Response } from "express";
import brandsService from "../services/brands.service";
import { sendJsonSuccess } from "../helpers/response.helper";


const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = await brandsService.findAll();
        //console.log('<<=== 🚀 brands Controller ===>>', brands);
        sendJsonSuccess(res, brands);
    } catch (error) {
        next(error);
    }
};


const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.findById(id);
        sendJsonSuccess(res, brand);
    } catch (error) {
        next(error);
    }
};


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brand = await brandsService.create(req.body);
        sendJsonSuccess(res, brand, 'Brand created successfully', 201);
    } catch (error) {
        next(error);
    }
};


const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.updateById(id, req.body);
        sendJsonSuccess(res, brand, 'Brand updated successfully');
    } catch (error) {
        next(error);
    }
};


const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.deleteById(id);
        sendJsonSuccess(res, brand, 'Brand deleted successfully');
    } catch (error) {
        next(error);
    }
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};