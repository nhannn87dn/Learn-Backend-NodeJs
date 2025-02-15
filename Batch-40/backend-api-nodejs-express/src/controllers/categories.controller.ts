import { Request, Response } from 'express';
import createError from 'http-errors';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/response.helper';
import { Types } from 'mongoose';
/**
 * Controller:
 * - Nhận đầu vào từ router
 * - Nhận kết quả từ service tương ứng với đầu vào
 * - Response kết quả cho client
 * - Không nên xử lý nghiệp vụ ở controller
 */


const getAll = async (req: Request, res: Response) => {
    const categories = await categoriesService.getAll();
    // res.status(200).json({
    //     statusCode: 200,
    //     message: 'Success',
    //     data: categories
    // });
    sendJsonSuccess(res,categories)    
}
const getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const category = await categoriesService.getById(id);
    //res.status(200).json(category);
    sendJsonSuccess(res,category) 
 
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
    const category = categoriesService.create(payload);
    res.status(201).json(category);
}

const updateByID = (req: Request, res: Response) => {
    const {id} = req.params;
    const payload = req.body;
    const result = categoriesService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const {id} = req.params;
   const category = categoriesService.deleteById(Number(id));
    res.status(200).json(category);
}

export default {
    getAll,
    getById,
    create,
    updateByID,
    deleteById
}