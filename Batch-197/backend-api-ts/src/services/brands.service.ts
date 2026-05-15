import createError from "http-errors";
import Brand from "../models/Brand.model";
import { CreateBrandDto, UpdateBrandDto } from "../types/brand.type";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

/**
 * @desc Get all list Brands
 * @route GET /api/v1/brands
 * @returns Promise<Array<Object>>
 */
const findAll = async () => {
  const data = await Brand.find();
  return data;
};

const getByIdOrFail = async (id: string) => {
  const brand = await Brand.findById(id);
    if (!brand) {
        throw createError(404, 'Brand not found');
    }
    return brand;
}

const create = async (createBrandDto: CreateBrandDto ) => {
    const newBrand = await Brand.create({
        brand_name: createBrandDto.brand_name,
        description: createBrandDto.description,
        slug: createBrandDto.slug,
    });
    await newBrand.save();
    return newBrand;
};

const updateById = async (id: string, updateBrandDto: UpdateBrandDto) => {
    //step 1: check if brand exists
    const brand =  await getByIdOrFail(id);
    //step 2: if exist,then update the name and description
    // const updatedBrand = await Brand.findByIdAndUpdate(
    //     id,
    //     updateBrandDto,
    //     { new: true }
    // );

    //Update từng trường cần thiết

    if(updateBrandDto.brand_name !== undefined){
        brand.brand_name = updateBrandDto.brand_name;
    }

    if(updateBrandDto.description !== undefined){
        brand.description = updateBrandDto.description;
    }
    if(updateBrandDto.slug !== undefined){
        brand.slug = updateBrandDto.slug;
    }
    await brand.save();

    return brand;
};

const deleteById = async (id: string) => {
    //step 1: check if brand exists
    const brand = await getByIdOrFail(id);
    //step 2: if exist, then remove it
    await Brand.deleteOne({ _id: brand._id });
    return brand;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};