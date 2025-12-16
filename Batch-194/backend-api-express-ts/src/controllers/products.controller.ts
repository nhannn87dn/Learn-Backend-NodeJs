import { getProductsHomeByCategoryId } from './../../../react-ts-frontside/src/modules/home/home.service';
import { NextFunction, Request, Response } from "express"
import createError from 'http-errors';
import productsService from "../services/products.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
import productStoreService from '../services/webStore/productStore.service';

const getProductsByCategoryHome = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const products = await productStoreService.getProductsByCategoryHome({
            categoryId: req.query.cat_id as string,
            limit: req.query.limit ? Number(req.query.limit) : 5
        });
        sendJsonSuccess({
            res,
            data: products
        });
    } catch (error) {
        next(error);
    }
}


/** Get All Products */
const findAll = async (req: Request, res: Response) => {
    const products = await productsService.findAll(req.query);
    sendJsonSuccess({
        res,
        data: products
    })
}

/* Find a product by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }

    const product = await productsService.findById({ id })

    sendJsonSuccess({
        res,
        data: product
    })
}

//create a new product
const create = async (req: Request, res: Response) => {
    console.log('<===== req.body =====>', req.body);
    const newProduct = await productsService.create({
        product_name: req.body.product_name,
        description: req.body.description,
        slug: req.body.slug,
        price: req.body.price,
        discount: req.body.discount,
        modelYear: req.body.modelYear,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock,
        category: req.body.category,
        brand: req.body.brand,
        isNew: req.body.isNew,
    });

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newProduct
    })
}

/* Update a product by Id */
const updateById = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    const { id } = req.params;
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }

    const product = await productsService.updateById({
        id,
        payload: {
            product_name: req.body.product_name,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price,
            discount: req.body.discount,
            modelYear: req.body.modelYear,
            thumbnail: req.body.thumbnail,
            stock: req.body.stock,
            category: req.body.category,
            brand: req.body.brand,
            isNew: req.body.isNew,
        }
    })

    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: product
    })
}

/* Delete a product by Id */
const deleteById = async (req: Request, res: Response) => {
    //step1: check xem id co ton tai khong
    const { id } = req.params;
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }
    //step1: Check xem trong db co ton tai record co id khong
    const product = await productsService.deleteById(id)
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: product
    })
}

const getProductsPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productStoreService.getProductsPagination(req.query);
        sendJsonSuccess({
            res,
            data: products
        });
    } catch (error) {
        next(error);
    }   
}

const getProductDetailsBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productStoreService.getProductDetailsBySlug(req.params.slug);
        sendJsonSuccess({
            res,
            data: product
        });
    }
    catch (error) {
        next(error);
    }
}
export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getProductsByCategoryHome,
    getProductsPagination,
    getProductDetailsBySlug
}
