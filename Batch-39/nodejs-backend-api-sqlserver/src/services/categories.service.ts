// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Category } from '../databases/entities/category.entity';

const categoryRepository = myDataSource.getRepository(Category)


// Lấy tất cả record
const findAll = async ()=>{
    const categories = await categoryRepository.find()
  return categories
}


export default {
  findAll,
}