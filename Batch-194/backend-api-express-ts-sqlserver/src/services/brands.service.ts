import createError from 'http-errors';
import Brand from "../models/Brand.model";
import { IBrandDTO } from '../types/brands';

const findAll = async()=>{
    //SELECT * FROM brands
    const brands = await Brand.find();
    return brands;
}

const findById = async({id}: {id: string}) =>{
    //SELECT * FROM brands WHERE id = ?
    const brand = await Brand.findById(id);
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!brand) {
       throw createError(404, "Brand not found")
    }
    return brand
}


const create =async(brandDto: IBrandDTO)=>{
   const brand = new Brand({
    brand_name: brandDto.brand_name,
    description: brandDto.description,
    slug: brandDto.slug,
   });
   const result = await brand.save();
    return result
}

const updateById =async({
    id,
    payload
}: {
    id: string,
    payload: Partial<IBrandDTO>
})=>{
    //step1: Check xem trong db co ton tai record co id khong
    let brand = await findById({id});
    if(!brand){
        throw createError(404, "Brand not found")
    }

    //Step 2: Xử lý update khi có thay đổi
    Object.assign(brand, payload);//merge 2 object lại với nhau
    
    //Lưu lại vào db
    await brand.save();
    return brand
}

const deleteById = async(id: string)=>{
    const brand = await findById({id});
    if(!brand){
        throw createError(404, "Brand not found")
    }
    //step2: Xoa neu co ton tai
    await Brand.findByIdAndDelete(brand._id);
    //Trả về brand đã xóa
    return brand;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}