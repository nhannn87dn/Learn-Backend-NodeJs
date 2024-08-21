import createError from 'http-errors';
// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Product } from '../databases/entities/product.entity';

const productRepository = myDataSource.getRepository(Product)


// Lấy tất cả record
const findAll = async (query: any)=>{
    const products = await productRepository.find()
  return products
}

const findById = async (id: number)=>{
  const product = await productRepository.findOne({
   where: {
    product_id: id
   }
  });
  //Check ton tai theo Id
  if(!product){
    throw createError(400, 'Product Not Found')
  }
  return product
}

const updateById = async (id: number, payload: any)=>{
  //Kiem tinh ton tai truoc
  const product = await findById(id);
  //Cap nhat
  Object.assign(product, payload);
  //save lai
  const updated = await productRepository.save(product)
  return updated

}

//Create new record
const create = async (payload: any)=>{
  const product =  productRepository.create(payload)
  //lu lai
  await productRepository.save(product)
  return product
}

//Delete a record

const deleteById = async (id: number) => {
  //Kiem tra tinh ton tai cua Id
  const product = await findById(id);
  //xoa
  await productRepository.delete({ 
    product_id: product.product_id 
  })
  return product
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById
}