import createError from "http-errors";
import Product from "../models/Product.model";
import { CreateProductDto, ProductDocument, UpdateProductDto } from "../types/product.type";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng cho Product,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

/**
 * @desc Get all list Products
 * @route GET /api/v1/products
 * @returns Promise<Array<Object>>
 */
const findAll = async (query: any) => {

  //phân trang
  const {page = 1, limit = 10} = query;
  const skip = (page - 1) * limit;

  let where = {};

  if (query.category && query.category != "") {
    where = { ...where, category: query.category };
  }

  if (query.brand && query.brand != "") {
    where = { ...where, brand: query.brand };
  }

  //filter for keyword
  if (query.keyword && query.keyword != "") {
    where = { 
      ...where, 
      product_name: {
         $regex: query.keyword,
         $options: 'i' 
      }
    };
  }

  const products = await Product
    .find({
      ...where
    })
    .select("-createdAt -updatedAt -__v")
    //quan hệ
    .populate("category", "category_name")
    .populate("brand", "brand_name")
    .sort({
      //price: -1, //giảm dần
      price: 1, //tăng dần
    })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Product.countDocuments({
    ...where
  });

  return {
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalRecords / limit),
      totalRecords
    }
  };
};

/**
 * @desc Get Product by ID or throw error
 * @param id string
 * @returns Product
 */
const getByIdOrFail = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createError(404, 'Product not found');
  }
  return product;
};

/**
 * @desc Create a new product
 * @param createProductDto CreateProductDto
 * @returns Product
 */
const create = async (createProductDto: CreateProductDto) => {
  const newProduct = await Product.create(createProductDto);
  return newProduct;
};

/**
 * @desc Update a product by ID
 * @param id string
 * @param updateProductDto UpdateProductDto
 * @returns Product
 */
const updateById = async (id: string, updateProductDto: UpdateProductDto) => {
  // step 1: check if product exists
  const product = await getByIdOrFail(id);

  // step 2: update fields if they are provided
  if (updateProductDto.product_name !== undefined) {
    product.product_name = updateProductDto.product_name;
  }
  if (updateProductDto.price !== undefined) {
    product.price = updateProductDto.price;
  }
  if (updateProductDto.discount !== undefined) {
    product.discount = updateProductDto.discount;
  }
  if (updateProductDto.category !== undefined) {
    product.category = updateProductDto.category;
  }
  if (updateProductDto.brand !== undefined) {
    product.brand = updateProductDto.brand;
  }
  if (updateProductDto.description !== undefined) {
    product.description = updateProductDto.description;
  }
  if (updateProductDto.model_year !== undefined) {
    product.model_year = updateProductDto.model_year;
  }
  if (updateProductDto.slug !== undefined) {
    product.slug = updateProductDto.slug;
  }
  if (updateProductDto.thumbnail !== undefined) {
    product.thumbnail = updateProductDto.thumbnail;
  }
  if (updateProductDto.stock !== undefined) {
    product.stock = updateProductDto.stock;
  }

  await product.save();
  return product;
};

/**
 * @desc Delete a product by ID
 * @param id string
 * @returns Product
 */
const deleteById = async (id: string) => {
  // step 1: check if product exists
  const product = await getByIdOrFail(id) as any;
  // step 2: remove it
  await Product.deleteOne({ _id: product._id });
  return product;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};
