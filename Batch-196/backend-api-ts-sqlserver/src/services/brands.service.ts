import createError from "http-errors";
import { Brand } from "../entities/Brand.entity";
import { CreateBrandDto, UpdateBrandDto } from "../types/brand.type";
import { myDataSource } from "../dataSource";

// khởi tạo repository cho entity Brand
const brandRepository = myDataSource.getRepository(Brand);

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng cho Brand,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

/**
 * @desc Get all list Brands
 * @route GET /api/v1/brands
 * @returns Promise<Array<Object>>
 */
const findAll = async () => {
  const data = await brandRepository.find();
  return data;
};

/**
 * @desc Get Brand by ID or throw error
 * @param id number
 * @returns Brand
 */
const getByIdOrFail = async (id: number) => {
  const brand = await brandRepository.findOne({
    where: { id },
  });
  if (!brand) {
    throw createError(404, 'Brand not found');
  }
  return brand;
};

/**
 * @desc Create a new brand
 * @param createBrandDto CreateBrandDto
 * @returns Brand
 */
const create = async (createBrandDto: CreateBrandDto) => {
  const newBrand = brandRepository.create({
    brandName: createBrandDto.brandName,
    description: createBrandDto.description,
    slug: createBrandDto.slug,
  });

  return await brandRepository.save(newBrand);
};

/**
 * @desc Update a brand by ID
 * @param id number
 * @param updateBrandDto UpdateBrandDto
 * @returns Brand
 */
const updateById = async (id: number, updateBrandDto: UpdateBrandDto) => {
  // step 1: check if brand exists
  const brand = await getByIdOrFail(id);

  // step 2: update fields if they are provided
  if (updateBrandDto.brandName !== undefined) {
    brand.brandName = updateBrandDto.brandName;
  }
  if (updateBrandDto.description !== undefined) {
    brand.description = updateBrandDto.description;
  }
  if (updateBrandDto.slug !== undefined) {
    brand.slug = updateBrandDto.slug;
  }

  return await brandRepository.save(brand);
};

/**
 * @desc Delete a brand by ID
 * @param id number
 * @returns Brand
 */
const deleteById = async (id: number) => {
  // step 1: check if brand exists
  const brand = await getByIdOrFail(id);
  // step 2: remove it
  await brandRepository.remove(brand);
  return brand;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};