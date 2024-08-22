import createError from 'http-errors';
// Kết nối trực tiếp với Database
import { myDataSource } from '../databases/data-soucre';
import { Product } from '../databases/entities/product.entity';
import { Like } from 'typeorm';

const productRepository = myDataSource.getRepository(Product)


// Lấy tất cả record
const findAll = async (query: any)=>{
  //SELECT * FROM products
  //const products = await productRepository.find();

  //SELECT product_id, product_name, price FROM products
  // const products = await productRepository.find({
  //   select: {
  //     product_id: true,
  //     product_name: true,
  //     price: true,
  //   }
  // });

  //SELECT với mệnh đề WHERE
  //SELECT * FROM products WHERE model_year = 2249
  // const products = await productRepository.findBy({
  //   model_year: 2249
  // })
  //hoặc cách thứ 2
  // const products = await productRepository.find({
  //   where: [
  //     {model_year: 2249},
  //     {product_id: 28}
  //   ]
  //   //SELECT * FROM products WHERE model_year = 2249 OR product_id = 27
  // })

  //Phân trang

  /* Phân trang */
  const page_str = query.page;
  const limit_str = query.limit;

  const page = page_str ? parseInt(page_str as string): 1;
  const limit = limit_str ? parseInt(limit_str as string): 10;

  /* Lọc theo từng điều kiện */
  let whereConditions: any = {};
  // Chỉ thêm điều kiện tìm kiếm theo category nếu query.category tồn tại
  if(query.category && query.category != ''){
      whereConditions = {...whereConditions, category: {
        category_id: query.category
      }}
  }
  /*
  SELECT p*, c.category_name FROM products AS p 
  LEFT JOIN categories AS c ON p.category_id = c.category_id
  WHERE c.category_id = 10

  */

  //Các điều kiện khác tại đây
  if(query.keyword && query.keyword != ''){
    whereConditions = {...whereConditions, product_name: Like(`%${query.keyword}%`)}
  }

  
  //Sắp xếp
  let objSort: any = {};
  const sortBy = query.sort || 'product_id'; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == 'ASC' ? 'ASC': 'DESC'
  objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

  //Truy vấn có phân trang
  const [products, totalCount] = await productRepository.findAndCount({
     select: {
        category: {
          //chỉ lấy
          category_id: true,
          category_name: true,
        },
        brand: {
          brand_id: true,
          brand_name: true,
        }
     },
      where: whereConditions,
      relations: {
          //quan hệ với các table khác
          category: true,
          brand: true, 
      },
      order: objSort,
      skip: (page - 1) * limit,
      take: limit,
  });

  return {
      products,
      sort: objSort,
      filters: whereConditions,
      pagination: {
          limit: limit,// số lượng item trên 1 trang
          page: page, //trang hiện tại
          totalPages: Math.ceil(totalCount / limit), //tổng số trang
          totalIRecords: totalCount, //tổng số records
      }
  }
}

const findById = async (id: number)=>{
  // const product = await productRepository.findOne({
  //  where: {
  //   product_id: id
  //  }
  // });

  const product = productRepository.query(`SELECT TOP 1 * FROM products WHERE product_id =${id}`)


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
const create = async (payload: any) => {
  const product = productRepository.create(payload)
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