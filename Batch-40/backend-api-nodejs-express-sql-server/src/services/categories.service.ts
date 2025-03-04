import createError from 'http-errors';
import { buildSlug } from '../helpers/slugify.helper';
import { Category } from '../entities/category.entity';
import { myDataSource } from '../data-source';

const categoryRepository = myDataSource.getRepository(Category);

const getAll = async (query: any) => {
    const categories = await categoryRepository.find();
  return categories;
};

const getById = async(id: string) => {
    
    return null;
}
const create = async(payload: any) => {
    const category = await categoryRepository.insert({
        category_name: payload.category_name,
        description: payload.description,
        slug: payload.slug && payload.slug !== '' ? payload.slug : buildSlug(payload.category_name)
    });
    return category;
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