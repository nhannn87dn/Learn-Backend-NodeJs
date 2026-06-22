import type { Request, Response, NextFunction } from "express";
import productsService from "../services/products.service";
import { UpdateProductDto } from "../types/product.type";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */




/*
 Get 5 products have promition for home page
*/  
const getPromotionProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const products = await productsService.getPromotionProducts(limit);
    sendJsonSuccess({ res, data: products });
  } catch (error) {
    next(error);
  }
}
//Get product detail by slug
const getProductDetailBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug as string;
    const product = await productsService.getProductDetailBySlug(slug);
    sendJsonSuccess({ res, data: product });
  } catch (error) {
    next(error);
  }
}

/*
 Get all products
*/
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.findAll(req.query);
    // res.json({
    //   statusCode: 200,
    //   message: "success",
    //   data: products.data,
    //   meta: products.pagination
    // });
    sendJsonSuccess({
      res,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/*
 Get product by id
*/
const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const product = await productsService.getByIdOrFail(id);
    sendJsonSuccess({ res, data: product });
  } catch (error) {
    next(error);
  }
};

//create new product
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createProductDto = req.body;
    const newProduct = await productsService.create(createProductDto);
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newProduct });
  } catch (error) {
    next(error);
  }
};

//update product by id
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const updateProductDto = req.body as UpdateProductDto;
    const product = await productsService.updateById(id, updateProductDto);
    sendJsonSuccess({ res, data: product });
  } catch (error) {
    next(error);
  }
};

//delete product by id
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const product = await productsService.deleteById(id);
    sendJsonSuccess({ res, data: product });
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
  getPromotionProducts,
  getProductDetailBySlug
};
