import createError from 'http-errors';
import { buildSlug } from '../helpers/buildSlug.helper';
import Category from '../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from '../types/category';

type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
};
//get all categories for select options
const getAllCategoriesSelect = async () => {
    const categories = await Category.find().select('category_name');
    return categories;
};

//Get All Categories
const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    const sortType = query.sortType === 'asc' ? 'asc' : 'desc';
    const sortBy = typeof query.sortBy === 'string' && query.sortBy.trim() !== ''
        ? query.sortBy
        : 'createdAt';

    let filter = {};
    if (search !== '') {
        filter = { ...filter, category_name: { $regex: search, $options: 'i' } };
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortType === 'asc' ? 1 : -1;

    const categories = await Category.find({
        ...filter,
    })
        .select('-__v -createdAt -updatedAt')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({
            ...sortOptions,
        });

    const total = await Category.countDocuments({
        ...filter,
    });

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
    const category = await Category.findById(id);

    if (!category) {
        throw createError(400, `Category with id ${id} not found`);
    }

    return category;
};

//create a new category
const create = async (createCategoryDto: CreateCategoryDto) => {
    if (!createCategoryDto.slug) {
        createCategoryDto.slug = buildSlug(createCategoryDto.category_name.toLowerCase());
    }

    const category = new Category(createCategoryDto);
    await category.save();

    return category;
};

//update a category by id
const updateById = async (id: string, updateCategoryDto: UpdateCategoryDto) => {
    const category = await findById(id);

    if (updateCategoryDto.category_name && !updateCategoryDto.slug) {
        updateCategoryDto.slug = buildSlug(updateCategoryDto.category_name.toLowerCase());
    }

    Object.assign(category, updateCategoryDto);

    await category.save();
    return category;
};

//delete a category by id
const deleteById = async (id: string) => {
    const category = await findById(id);

    await category.deleteOne();
    return category;
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getAllCategoriesSelect,
}