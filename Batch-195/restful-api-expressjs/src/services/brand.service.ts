import { IBrandDTO } from "../types/brand.type";
import createError from 'http-errors';
import Brand from "../models/brand.model";

const getAllBrands = async () => {
    // get all brands from database
    const result = await Brand.find();
    return result;
}

const getBrandById = async (id: string) => {
    // SELECT * FROM brands WHERE id = id
    const brand = await Brand.findById(id);
    if (!brand) {
        throw createError(404, 'Brand not found');
    }
    return brand;
}

const createBrand = async (payload: IBrandDTO) => {
    // Implementation for creating a brand
    const newBrand = {
        brand_name: payload.brand_name,
        description: payload.description,
        slug: payload.slug,
    };
    const brand = new Brand(newBrand);
    const result = await brand.save(); // lưu vào database
    // trả về kết quả tạo mới
    return result;
}

const updateBrandById = async (id: string, payload: IBrandDTO) => {
    // Implementation for updating a brand
    let brand = await getBrandById(id);
    Object.assign(brand, {
        brand_name: payload.brand_name,
        description: payload.description,
        slug: payload.slug,
    });
    const result = await brand.save();
    // trả về kết quả cập nhật
    return result;
}

const deleteBrandById = async (id: string) => {
    // trả về kết quả sau khi xóa
    const brand = await getBrandById(id);
    const result = await Brand.deleteOne({ _id: brand._id });
    // trả về kết quả xóa
    return result;
}

export default {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrandById,
    deleteBrandById,
}
