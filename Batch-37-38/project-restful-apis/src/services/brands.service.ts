import createError from 'http-errors';
import Brand from '../models/brand.model';
import { IBrand } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Brand.find();
    return result
}

const getBrandById  = async (id:string)=>{
    //SELECT * FROM brands WHERE _id = id
    const result = await Brand.findById(id);

    if(!result){
        throw createError(404,'Brand not found');
    }
    return result;
}

const createBrand = async (data: IBrand)=>{
    const result = await Brand.create(data)
    return result;
}

const updateBrand = async (id: string,data: IBrand)=>{
    //check xem id co ton tai khong
    const brand = await Brand.findByIdAndUpdate(id, data, {
        new: true,
    });

    return brand
}

const deleteBrand = async (id:string)=>{
   
    const brand = await Brand.findByIdAndDelete(id);
    return brand
}

export default {
    getAll,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}