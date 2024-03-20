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
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getProductById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(product, data);
    await product.save();
    return product
}

const deleteProduct = async (id:string)=>{
   
    //const product = await Product.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const product = await getProductById(id);
    await Product.deleteOne({ _id: product._id });
    return product
}

export default {
    getAll,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}