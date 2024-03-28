import {Request,Response, NextFunction} from 'express'
import productsService from '../services/products.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await productsService.getAll(req.query);
        //console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const getAllClient = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await productsService.getAllClient(req.query);
        //console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const product = await productsService.getProductById(id)
        //res.status(200).json(product)
        sendJsonSuccess(res)(product)
    }
    catch(err){
        next(err)
    }
}


const getProductBySlug = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {slug} = req.params; //return id = string

        const product = await productsService.getProductBySlug(slug)
        //res.status(200).json(product)
        sendJsonSuccess(res)(product)
    }
    catch(err){
        next(err)
    }
}

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const product=  await productsService.createProduct(data)

        // res.status(201).json({
        //     message: `Create Product`,
        //     product: product
        // })
        sendJsonSuccess(res, 'Create Product successfully', 201)(product)
    }
    catch(err){
        next(err)
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const product = await productsService.updateProduct(id,data)

        // res.status(200).json({
        //     message: `Update Product by ID ${id}`,
        //     product: product
        // })
        sendJsonSuccess(res)(product)
    }
    catch(err){
        next(err)
    }
}

const deleteProduct = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const product = await productsService.deleteProduct(id)
        // res.status(200).json({
        //     message: `Delete Product by ID ${id}`,
        //     product: product
        // })
        sendJsonSuccess(res)(product)
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getAllClient,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
}