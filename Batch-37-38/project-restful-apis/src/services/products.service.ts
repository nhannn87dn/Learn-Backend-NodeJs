import createError from 'http-errors';
import Product from '../models/product.model';
import { IProduct } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Product.find().populate('category');
    return result
}

const getProductById  = async (id:string)=>{
    //SELECT * FROM products WHERE _id = id
    const result = await Product.findById(id);

    if(!result){
        throw createError(404,'Product not found');
    }
    return result;
}

const createProduct = async (data: IProduct)=>{
    const result = await Product.create(data)
    return result;
}

const updateProduct = async (id: string,data: IProduct)=>{
    //check xem id co ton tai khong
    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    });

    return product
}

const deleteProduct = async (id:string)=>{
   
    const product = await Product.findByIdAndDelete(id);
    return product
}

export default {
    getAll,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}