import createError from 'http-errors';
import { buildSlug } from '../helpers/buildSlug.helper';
import Brand from '../models/brand.model';
import { CreateBrandDto, UpdateBrandDto } from '../types/brand';

type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
};

//get brans for select options
const getAllBrandsSelect = async () => {
    const brands = await Brand.find().select('brand_name');
    return brands;
}

//Get All Brands
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
        filter = { ...filter, brand_name: { $regex: search, $options: 'i' } };
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortType === 'asc' ? 1 : -1;

    const brands = await Brand.find({
        ...filter,
    })
        .select('-__v -createdAt -updatedAt')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({
            ...sortOptions,
        });

    const total = await Brand.countDocuments({
        ...filter,
    });

    return {
        records: brands,
        metadata: {
            limit,
            page,
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

//Get Brand by ID
const findById = async (id: string) => {
    const brand = await Brand.findById(id);

    if (!brand) {
        throw createError(400, `Brand with id ${id} not found`);
    }

    return brand;
};

//create a new brand
const create = async (createBrandDto: CreateBrandDto) => {
    if (!createBrandDto.slug) {
        createBrandDto.slug = buildSlug(createBrandDto.brand_name.toLowerCase());
    }

    const brand = new Brand(createBrandDto);
    await brand.save();
    return brand;
};

//update a brand by id
const updateById = async (id: string, updateBrandDto: UpdateBrandDto) => {
    const brand = await findById(id);

    if (updateBrandDto.brand_name && !updateBrandDto.slug) {
        updateBrandDto.slug = buildSlug(updateBrandDto.brand_name.toLowerCase());
    }

    Object.assign(brand, updateBrandDto);

    await brand.save();
    return brand;
};

//delete a brand by id
const deleteById = async (id: string) => {
    const brand = await findById(id);

    await brand.deleteOne();
    return brand;
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getAllBrandsSelect
}