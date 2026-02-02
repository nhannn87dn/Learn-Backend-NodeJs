import { IProductDTO } from '../types/product.type';
import createError from 'http-errors';
import Product from '../models/product.model';
import Brand from '../models/brand.model';
import Category from '../models/category.model';

const getAllProducts = async (query: any) => {
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

  return {
    items: products,
    pagination: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
    }
  };
};

const getProductById = async (id: string) => {
  // SELECT * FROM products WHERE id = id
  const product = await Product
  .findById(id)
  .populate('category', '_id category_name') //join với bảng category
  .populate('brand', '_id brand_name') //join với bảng brand
  
  if (!product) {
    throw createError(404, 'Product not found');
  }
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

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
