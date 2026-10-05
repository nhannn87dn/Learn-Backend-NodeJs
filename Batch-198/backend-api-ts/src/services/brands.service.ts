import Brand from "../models/brand.model";
import { BrandCreateDTO } from "../types/brand";
import createError from "http-errors";

// Lấy tất cả thương hiệu
const findAll = async () => {
    const brands = await Brand.find();
    return brands;
}

// Lấy thương hiệu theo ID
const findById = async (id: string) => {
    const brand = await Brand.findById(id);
    if (!brand) {
        throw createError(404, "Brand not found");
    }
    return brand;
}

// Tạo thương hiệu mới
const create = async (payload: BrandCreateDTO) => {
    const newBrand = await Brand.create(payload);
    return newBrand;
}

// Update thương hiệu theo ID
const updateById = async (id: string, payload: Partial<BrandCreateDTO>) => {
    const brand = await findById(id);

    // Update the brand with the new data
    Object.assign(brand, payload);
    // Save the updated brand
    await brand.save();
    return brand;
}

// Delete thương hiệu theo ID
const deleteById = async (id: string) => {
    const brand = await findById(id);
    await Brand.findByIdAndDelete(brand._id);
    return brand;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
