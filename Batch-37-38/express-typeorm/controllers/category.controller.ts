
import {Request, Response, NextFunction} from 'express'
import categoryService from '../services/category.service'

const getAll = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const result = await categoryService.getAll(req.query);
        res.status(200).json({
            statusCode: 0,
            message: 'Success',
            data: result
        })
    } catch (error) {
        next(error)
    }
    
}

const getById = async (req: Request, res: Response, next:NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await categoryService.getById(parseInt(id));
        res.status(200).json({
            statusCode: 0,
            message: 'Success',
            data: result
        });
    } catch (error) {
        next(error)
    }
    
}

const create = async(req: Request, res: Response, next:NextFunction)=>{
    try {
        const result = await categoryService.create(req.body);
        res.status(201).json({
            statusCode: 0,
            message: 'Success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


//Update By ID
const updateById = async(req: Request, res: Response, next:NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await categoryService.updateById(parseInt(id), req.body);
        res.status(200).json({
            statusCode: 0,
            message: 'Success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

//Delete By ID
const deleteById = async(req: Request, res: Response, next:NextFunction)=>{
    try {
        const {id} = req.params;
        const result  = await categoryService.deleteById(parseInt(id))
        res.status(200).json({
            statusCode: 0,
            message: 'Success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}