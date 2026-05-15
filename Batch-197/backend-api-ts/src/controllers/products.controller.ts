import type { Request, Response } from "express";
import productsService from "../services/products.service";
import { UpdateProductDto } from "../types/product.type";
import { sendJsonSuccess } from "../helpers/responseHandler";

/**
 * Nhiệm vụ của controller là nhận request từ client, 
 * gọi service để xử lý logic nghiệp vụ, 
 * và trả về response cho client
 */

/*
 Get all products
*/
const findAll = async (req: Request, res: Response) => {

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
};

/*
 Get product by id
*/
const findById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await productsService.getByIdOrFail(id);
  res.json(product);
};

//create new product
const create = async (req: Request, res: Response) => {
  const createProductDto = req.body;
  const newProduct = await productsService.create(createProductDto);
  res.status(201).json(newProduct);
};

//update product by id
const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updateProductDto = req.body as UpdateProductDto;
  const product = await productsService.updateById(id, updateProductDto);
  res.json(product);
};

//delete product by id
const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await productsService.deleteById(id);
  res.status(204).json(product);
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
