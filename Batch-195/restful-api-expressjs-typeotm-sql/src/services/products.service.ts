import { IProductDTO } from '../types/product.type';
import productRepository from '../repositories/product.repository';


const getAllProducts = async (query: any) => {
  //TH 1. find All
  //const products = await productRepository.findAllProducts(query);
  //TH2: find some fields
  //const products = await productRepository.findProductSomeFields(query);
  //TH3: find with condition
  //const products = await productRepository.findProductWithCondition(query);
  //TH4: find with relationship
  //const products = await productRepository.findProductWithRelation(query);
  //TH5: find with order by
  //const products = await productRepository.findProductWithOrder(query);
  //TH6: find with pagination
   const result = await productRepository.findProductWithPagination(query);
  return result;
};

const getProductById = async (id: number) => {
  const product = await productRepository.getProductById(id);
  return product;
};

const createProduct = async (payload: IProductDTO) => {
  const product = await productRepository.createProduct(payload);
  return product;
};


const updateProductById = async (id: number, payload: IProductDTO) => {
  const product = await productRepository.updateProductById(id, payload);
   
  return product;
};

const deleteProductById = async (id: number) => {
  
  return await productRepository.deleteProductById(id);
};


export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
