import createError from 'http-errors';
import { buildSlug } from '../helpers/slugify.helper';
import { Product } from '../entities/product.entity';
import { myDataSource } from '../data-source';

const productRepository = myDataSource.getRepository(Product);

const getAll = async (query: any) => {
    const products = await productRepository.find();
  return products;
};

const getById = async(id: string) => {
    
    return null;
}
const create = async(payload: any) => {
    const product = await productRepository.insert(payload);
    return product;
}

const updateById = async(id: string, payload: any) => {
    
    return null;
}

const deleteById = async(id: string) => {
    
    return null;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}