import createError from 'http-errors';
// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Brand } from '../databases/entities/brand.entity';

const brandRepository = myDataSource.getRepository(Brand)


// Lấy tất cả record
const findAll = async ()=>{
    const brands = await brandRepository.find()
  return brands
}

const findById = async (id: number)=>{
  const brand = await brandRepository.findOne({
   where: {
    brand_id: id
   }
  });
  //Check ton tai theo Id
  if(!brand){
    throw createError(400, 'Brand Not Found')
  }
  return brand
}

const updateById = async (id: number, payload: any)=>{
  //Kiem tinh ton tai truoc
  const brand = await findById(id);
  //Cap nhat
  Object.assign(brand, payload);
  //save lai
  const updated = await brandRepository.save(brand)
  return updated

}

//Create new record
const create = async (payload: any)=>{
  const brand =  brandRepository.create({
    brand_name: 'abc'
  })
  //lu lai
  await brandRepository.save(brand)
  return brand
}

//Delete a record

const deleteById = async (id: number) => {
  //Kiem tra tinh ton tai cua Id
  const brand = await findById(id);
  //xoa
  await brandRepository.delete({ 
    brand_id: brand.brand_id 
  })
  return brand
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById
}