import { IProductDTO } from "../types/product.type";
import createError from 'http-errors';
import Product from "../models/product.model";

const getAllProducts = async () => {
    //1. select * from products
    // const result = await Product.find();

    //2. select product_name, price, modelYear from products
    // const result = await Product
    // .find()
    // .select('product_name price modelYear'); //Chỉ lấy các trường cần thiết
    
    //3. Lấy tất cả các trường ngoại trừ updatedAt

    // const result = await Product.find().select('-updatedAt');

    //4.select với sắp xếp 
    // const result = await Product.find()
    // .select('-updatedAt')
    // .sort({
    //     product_name: 1, //1: tăng dần, -1: giảm dần
    //     price: -1, //1: tăng dần, -1: giảm dần
    // })

    //5. Select với điều kiện where
    //vd1: select * from product where price > 1000

    // const result = await Product.find(
    //     {
    //         price: { $gt: 1000 } //gt: greater than
    //     }
    // )

    //vd1: select * from product where price > 1000 and category = 697c99202d5eb0ca72e5c232
    // const result = await Product.find({
    //     $and: [
    //         {price: { $gt: 1000 }},
    //         {category: '697c99202d5eb0ca72e5c232'}
    //     ]
    // })
    //6. select voi populate (join)
    const result = await Product
    .find()
    .populate('category', '_id category_name') //join với bảng category
    .populate('brand', '_id brand_name'); //join với bảng brand

    
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
