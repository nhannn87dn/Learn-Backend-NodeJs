import createError from 'http-errors';
import { buildSlug } from '../helpers/buildSlug.helper';
import { myDataSource } from '../data-source';
import { Category } from '../entities/categories.entity';
import productsService from './products.service';

import { CreateCategoryDto, UpdateCategoryDto } from '../types/category';

type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
};

const categoryRepository = myDataSource.getRepository(Category);

//get all categories for select options
const getAllCategoriesSelect = async () => {
    return categoryRepository.find({
        select: ['id', 'category_name'],
    });
};

const getCategoriesTree = async () => {
    return categoryRepository.find({
        select: ['id', 'category_name', 'slug'],
    });
}

//Get All Categories
const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    const sortType = query.sortType === 'asc' ? 'asc' : 'desc';
    const sortBy = typeof query.sortBy === 'string' && query.sortBy.trim() !== ''
        ? query.sortBy
        : 'createdAt';

    const queryBuilder = categoryRepository.createQueryBuilder('category');

    if (search !== '') {
        queryBuilder.where('LOWER(category.category_name) LIKE LOWER(:search)', {
            search: `%${search}%`,
        });
    }

    const sortableFields: Record<string, string> = {
        id: 'category.id',
        category_name: 'category.category_name',
        slug: 'category.slug',
    };
    queryBuilder
        .orderBy(sortableFields[sortBy] ?? 'category.id', sortType === 'asc' ? 'ASC' : 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

    const [categories, total] = await queryBuilder.getManyAndCount();

    return {
        records: categories,
        metadata: {
            limit,
            page,
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

//Get Category by ID
const findById = async (id: string) => {
    const categoryId = Number(id);
    const category = Number.isInteger(categoryId)
        ? await categoryRepository.findOneBy({ id: categoryId })
        : null;

    if (!category) {
        throw createError(400, `Category with id ${id} not found`);
    }

    return category;
};

//create a new category
const create = async (createCategoryDto: CreateCategoryDto) => {
    const slug = createCategoryDto.slug
        ?? buildSlug(createCategoryDto.category_name.toLowerCase());

    const category = categoryRepository.create({
        ...createCategoryDto,
        slug,
    });
    await categoryRepository.save(category);

    return category;
};

//update a category by id
const updateById = async (id: string, updateCategoryDto: UpdateCategoryDto) => {
    const category = await findById(id);

    if (updateCategoryDto.category_name && !updateCategoryDto.slug) {
        updateCategoryDto.slug = buildSlug(updateCategoryDto.category_name.toLowerCase());
    }

    Object.assign(category, updateCategoryDto);

    await categoryRepository.save(category);
    return category;
};

//delete a category by id
const deleteById = async (id: string) => {
    const category = await findById(id);

    await categoryRepository.remove(category);
    return category;
};

const getCategoryHomeProducts = async (categoryId: string, limit: number) => {
    //bước 1 check tồn tại categoryId
    const category = await findById(categoryId);
    //bước 2 lấy sp theo categoryId và limit
    const products = await productsService.getHomeProductsByCategory(category.id.toString(), limit);
    return {
        category,
        products
    };
}

const getCategoryProducts = async(slug: string, query: QueryParams)=>{
    //const { limit=20, page=1, sortBy='createdAt', sortType='desc' } = query;
    //bước 1 check tồn tại categoryId
    const category = await categoryRepository.findOneBy({ slug });
    if(!category){
        throw createError(400, `Category with slug ${slug} not found`);
    }
    //bước 2 lấy sp theo slug và limit
    const products = await productsService.getProductsByCategoryId(category.id.toString(), {
        ...query,
        limit: Number(query.limit) || 20,
        page: Number(query.page) || 1,
    });
    return {
        category,
        products
    };
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getAllCategoriesSelect,
    getCategoriesTree,
    getCategoryHomeProducts,
    getCategoryProducts
}