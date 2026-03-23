import { IProductDTO } from '../types/product.type';
import createError from 'http-errors';
import Product from '../models/product.model';
import Brand from '../models/brand.model';
import Category from '../models/category.model';
import redisClient from '../common/configs/redisClient';

const getAllProducts = async (query: any) => {
  //implement redis cache

  //step 1: cache key with static key
  const cacheKey = `products`;

  //step2: check if data exists in cache
  const cachedData = await redisClient.get(cacheKey);
  if(cachedData) {
    console.log('CACHE HIT');
    return JSON.parse(cachedData);
  }


  //step 3: if not exists in cache, query database
  console.log('CACHE MISS');

  //paginatio
  const { page = '1', limit = '10' } = query;
  const pageNumber = parseInt(page as string, 10); //default page 1
  const limitNumber = parseInt(limit as string, 10); //default limit 10
  const skip = (pageNumber - 1) * limitNumber;

  //implement filters
  let where = {};

  //filter by keyword
  if(query.keyword && query.keyword !== '') {
    where = {
      ...where,
      //Tìm theo tên sản phẩm
        product_name: {
            $regex: query.keyword,
            $options: 'i'
        }
    }
  }

  //filter by category_id
    if(query.cat_id && query.cat_id !== '') {
        where = {
            ...where,
            category: query.cat_id
        }
    }

    //filter by brand_id
    if(query.brand_id && query.brand_id !== '') {
        where = {
            ...where,
            brand: query.brand_id
        }
    }

    //filter by isNew
    if(query.isNew && query.isNew !== '') {
        where = {
            ...where,
            isNew: query.isNew === 'true' ? true : false,
        }
    }

    //implement sorting
    let sortObj: any = {};
    const sortBy = query?.sortBy || 'createdAt'; //default sort by createdAt
    const sortType = query?.sortType === 'asc' ? 1 : -1; //default desc
    sortObj[sortBy] = sortType;

  
  const [products, total] = await Promise.all([
    Product.find({
        ...where
    })
      .populate('category', '_id category_name') //join với bảng category
      .populate('brand', '_id brand_name') //join với bảng brand
      .sort(sortObj)
      .skip(skip)
      .limit(limitNumber),
    Product.countDocuments({
        ...where
    }),
  ]);
  const totalPages = Math.ceil(total / limitNumber);


  const queryData = {
    items: products,
    pagination: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
    }
  }

  //step 4: store data in cache with expiration time (e.g., 1 hour)
  await redisClient.set(cacheKey, JSON.stringify(queryData), 'EX', 3600); // 3600 seconds = 1 hour
  console.log('Data stored in cache');

  return queryData;
};

const getProductById = async (id: string) => {
  //step 1: cache key
  const cacheKey = `product:${id}`;
  //step 2: check cache

  const cacheData = await redisClient.get(cacheKey);
  if(cacheData){
    console.log('CACHE HIT')
    return JSON.parse(cacheData)
  }

  //step 3: query db if not exists cache
  console.log('cache miss')

  // SELECT * FROM products WHERE id = id
  const product = await Product
  .findById(id)
  .populate('category', '_id category_name') //join với bảng category
  .populate('brand', '_id brand_name') //join với bảng brand
  
  if (!product) {
    throw createError(404, 'Product not found');
  }

  //step 4: save data to cache
  await redisClient.set(cacheKey, JSON.stringify(product), 'EX', 3600); // 3600 seconds = 1 hour

  
  return product;
};

const createProduct = async (payload: IProductDTO) => {
  //step 1: validate unique slug, product_name if needed
    await makeSureProductNameIsUnique(payload.product_name);
    await makeSureSlugIsUnique(payload.slug);

  //step 2: validate category_id, brand_id if needed
    await makeSureCategoryExists(payload.category);
    await makeSureBrandExists(payload.brand);

  //step n: upload images if needed

  // step final: create new product
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
};

const updateProductById = async (id: string, payload: IProductDTO) => {

    //Áp dụng tất cả logic tương tự bên create


  const  product = await Product.findById(id);
 if (!product) {
    throw createError(404, 'Product not found');
  }

  // Object.assign(product, {
  //   product_name: payload.product_name,
  //   description: payload.description,
  //   slug: payload.slug,
  //   price: payload.price,
  //   discount: payload.discount,
  //   category: payload.category,
  //   brand: payload.brand,
  //   stock: payload.stock,
  //   thumbnail: payload.thumbnail,
  //   modelYear: payload.modelYear,
  // });

  if(payload.price) {
    product.price = payload.price;
  }

  const result = await product.save();
  // trả về kết quả cập nhật

  // invalidate cache sau khi update
  const cacheKey = `product:${id}`;
  await redisClient.del(cacheKey); // xóa cache của sản phẩm đã cập nhật
  return result;
};

const deleteProductById = async (id: string) => {
  // trả về kết quả sau khi xóa
  const product = await getProductById(id);
  const result = await Product.deleteOne({ _id: product._id });
  // trả về kết quả xóa
  return result;
};

const makeSureProductNameIsUnique = async (product_name: string) => {
  const existingProduct = await Product.findOne({ product_name });
  if (existingProduct) {
    throw createError(400, 'Product name is already in use');
  }
    return true;
};

const makeSureSlugIsUnique = async (slug: string) => {
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    throw createError(400, 'Slug is already in use');
  }
    return true;
};

const makeSureCategoryExists = async (categoryId: string) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw createError(400, "Category not found")
    }
    return true;
};

const makeSureBrandExists = async (brandId: string) => {
    const brand = await Brand.findById(brandId);
    if (!brand) {
        throw createError(400, "Brand not found")
    }
    return true;
};

// ENUM ProductType {
//   NEW = 'new',
//   HOT = 'hot',
//   SALE = 'sale',
// }
/* Lấy 5 sp mới nhất, hot nhất, sale nhiều nhất ra Homepage */
const getRecommendProduct = (query: any)=>{
  const {type='new', limit=5} = query;

  let where = {};
  if( type === 'new'){
    where = {...where, isNew: true} 
  }
  //TODO: implement logic for hot and sale product
  return Product.find({...where}).sort({createdAt: -1}).limit(limit);
}

//Lấy ra 5 sp KM của một danh mục cụ thể để đưa ra Home
const getSaleProductByCategory = (catId: string, limit=5)=>{
  if(!catId) {
    throw createError(400, "Category ID is required");
  }
    return Product.find({
        category: catId,
        discount: {$gt: 0} //sp
    }).sort({discount: -1}).limit(limit);
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  getRecommendProduct,
  getSaleProductByCategory
};
