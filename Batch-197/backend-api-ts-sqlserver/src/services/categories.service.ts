import createError from 'http-errors';
import { buildSlug } from '../helpers/buildSlug.helper';
import { myDataSource } from '../data-source';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../types/category';


type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
};

//Bước 1 khởi tạo một repository cho entity Category để thực hiện các thao tác với cơ sở dữ liệu
const categoryRepository = myDataSource.getRepository(Category);


//Get All Categories
const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    const sortType = query.sortType === 'asc' ? 'asc' : 'desc';
    const sortBy = typeof query.sortBy === 'string' && query.sortBy.trim() !== ''
        ? query.sortBy
        : 'id';

    //select and pagination
    const [categories, total] = await categoryRepository.findAndCount({
        where: search ? { category_name: myDataSource.driver.escape(`%${search}%`) } : {},
        order: { [sortBy]: sortType.toUpperCase() as 'ASC' | 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
    });
    return {
        records: categories,
        metadata: {
            limit: Number(limit),
            page: Number(page),
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
        }
    };
};

//Get Category by ID
const findById = async (id: number) => {
    //trả về 1 dòng theo điều kiện where, nếu không tìm thấy thì trả về null
    const category = await categoryRepository.findOneBy({ id });
    if (!category) {
        throw createError(404, `Category with id ${id} not found`);
    }
    return category;
};

//create a new category
const create = async (createCategoryDto: CreateCategoryDto) => {
    const category = categoryRepository.create({
        category_name: createCategoryDto.category_name,
        description: createCategoryDto.description,
        slug: createCategoryDto.slug || buildSlug(createCategoryDto.category_name),
    });
    //lưu category vào cơ sở dữ liệu
    const result =  await categoryRepository.save(category);
    return result;
};

//update a category by id
const updateById = async (id: number, updateCategoryDto: UpdateCategoryDto) => {
    //bước 1: check xem category có tồn tại hay không
    const category = await findById(Number(id));
    //bước 2: cập nhật dữ liệu category
    category.category_name = updateCategoryDto.category_name || category.category_name;
    category.description = updateCategoryDto.description || category.description;
    category.slug = updateCategoryDto.slug || category.slug;
    //lưu cập nhật vào cơ sở dữ liệu
    const result = await categoryRepository.save(category);
    return result;
};

//delete a category by id
const deleteById = async (id: number) => {
    //bước 1: check xem category có tồn tại hay không
    const category = await findById(Number(id));
    //bước 2: xóa category
    const result = await categoryRepository.remove(category);
    // const result = await categoryRepository.delete(category.id); //cách này cũng được nhưng sẽ không trả về dữ liệu của category vừa xóa
    return result;
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}