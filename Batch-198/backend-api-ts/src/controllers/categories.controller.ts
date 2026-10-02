import {Request, Response, NextFunction} from "express";
import categoriesService from "../services/categories.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoriesService.findAll();
        sendJsonSuccess(res, categories);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
   try{
     const { id } = req.params;
    const category = await categoriesService.findById(String(id));
    // res.status(200).json({
    //     statusCode: 200,
    //     message: "success",
    //     data: category
    // });
    sendJsonSuccess(res, category, { statusCode: SUCCESS.OK.statusCode, message: SUCCESS.OK.message });

   }
   catch(error) {
    next(error);
   }
}


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const newCategory = await categoriesService.create(payload);
        sendJsonSuccess(res, newCategory, { statusCode: SUCCESS.CREATED.statusCode, message: SUCCESS.CREATED.message });
    } catch (error) {
        next(error);
    }
}

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updatedCategory = await categoriesService.updateById(String(id), payload);
        sendJsonSuccess(res, updatedCategory);
    } catch (error) {
        next(error);
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoriesService.deleteById(String(id));
        sendJsonSuccess(res, deletedCategory);
    } catch (error) {
        next(error);
    }
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}