import { IProductDTO } from "../types/product.type";
import createError from 'http-errors';
import Product from "../models/product.model";

const getAllProducts = async () => {
    // get all products from database
    const result = await Product.find();
    return result;
}

const getProductById = async (id: string) => {
    // SELECT * FROM products WHERE id = id
    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, 'Product not found');
    }
    return product;
}

const createProduct = async (payload: IProductDTO) => {
    // Implementation for creating a product
    const newProduct = {
        product_name: payload.product_name,
        description: payload.description,
        slug: payload.slug,
        price: payload.price,
        discount: payload.discount,
        category: payload.category,
        brand: payload.brand,
        stock: payload.stock,
        thumbnail: payload.thumbnail,
        modelYear: payload.modelYear,
    };
    const product = new Product(newProduct);
    const result = await product.save(); // lưu vào database
    // trả về kết quả tạo mới
    return result;
}

const updateProductById = async (id: string, payload: IProductDTO) => {
    // Implementation for updating a product
    let product = await getProductById(id);
    Object.assign(product, {
        product_name: payload.product_name,
        description: payload.description,
        slug: payload.slug,
        price: payload.price,
        discount: payload.discount,
        category: payload.category,
        brand: payload.brand,
        stock: payload.stock,
        thumbnail: payload.thumbnail,
        modelYear: payload.modelYear,
    });
    const result = await product.save();
    // trả về kết quả cập nhật
    return result;
}

const deleteProductById = async (id: string) => {
    // trả về kết quả sau khi xóa
    const product = await getProductById(id);
    const result = await Product.deleteOne({ _id: product._id });
    // trả về kết quả xóa
    return result;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}
