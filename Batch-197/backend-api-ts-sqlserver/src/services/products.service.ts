import createError from 'http-errors';
import { Like } from 'typeorm';
import { buildSlug } from '../helpers/buildSlug.helper';
import { myDataSource } from '../data-source';
import { Category } from '../entities/categories.entity';
import { Product } from '../entities/products.entity';
import { CreateProductDto, QueryParams, UpdateProductDto } from '../types/product';

const productRepository = myDataSource.getRepository(Product);
const categoryRepository = myDataSource.getRepository(Category);

const findAll = async (query: QueryParams = {}) => {
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const search = typeof query.search === 'string' ? query.search.trim() : '';
  const sortType = query.sortType === 'asc' ? 'ASC' : 'DESC';
  const sortFields: Record<string, string> = {
    id: 'id',
    product_name: 'productName',
    productName: 'productName',
    price: 'price',
    discount: 'discount',
    model_year: 'modelYear',
    modelYear: 'modelYear',
    stock: 'stock',
    slug: 'slug',
  };
  const sortBy = sortFields[query.sortBy || ''] || 'id';
  const where = {
    ...(search ? { productName: Like(`%${search}%`) } : {}),
    ...(query.category ? { category: { id: Number(query.category) } } : {}),
  };

  const [products, total] = await productRepository.findAndCount({
    //chọn trường cần lấy
    select: {
      id: true,
      productName: true,
      price: true,
      discount: true,
      modelYear: true,
      stock: true,
      thumbnail: true,
      slug: true,
      category: {
        category_name: true,
      }
    },
    // điều kiện where
    where,
    // join với table nào
    relations: { category: true },
    order: { [sortBy]: sortType },
    //phân trang
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    records: products,
    metadata: {
      limit,
      page,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/** Lấy sản phẩm theo id */

const findById = async (id: string) => {
  const product = await productRepository.findOne({
    where: { id: Number(id) },
    relations: { category: true }, // join với category
  });
  if (!product) {
    throw createError(404, `Product with id ${id} not found`);
  }
  return product;
};

/** create new product */
const create = async (createProductDto: CreateProductDto) => {
  //Đảm bao tính toàn vẹn dữ liệu thì để check category tồn tại hay không trước khi tạo product
  const category = await categoryRepository.findOneBy({ id: Number(createProductDto.category) });
  if (!category) {
    throw createError(400, `Category with id ${createProductDto.category} not found`);
  }

  const product = productRepository.create({
    productName: createProductDto.product_name,
    description: createProductDto.description,
    price: createProductDto.price,
    discount: createProductDto.discount,
    category: category,
    modelYear: createProductDto.model_year,
    slug: createProductDto.slug || buildSlug(createProductDto.product_name),
    thumbnail: createProductDto.thumbnail,
    stock: createProductDto.stock,
  });
  return productRepository.save(product);
};

/** update product */

const update = async (id: string, updateProductDto: UpdateProductDto) => {
  const product = await findById(id);
  const productName = updateProductDto.product_name;

  if (productName !== undefined) product.productName = productName;
  if (updateProductDto.description !== undefined) product.description = updateProductDto.description;
  if (updateProductDto.price !== undefined) product.price = updateProductDto.price;
  if (updateProductDto.discount !== undefined) product.discount = updateProductDto.discount;
  if (updateProductDto.model_year !== undefined) product.modelYear = updateProductDto.model_year;
  if (updateProductDto.thumbnail !== undefined) product.thumbnail = updateProductDto.thumbnail;
  if (updateProductDto.stock !== undefined) product.stock = updateProductDto.stock;
  if (updateProductDto.category !== undefined) {
    //Đảm bao tính toàn vẹn dữ liệu thì để check category tồn tại hay không trước khi tạo product
    const category = await categoryRepository.findOneBy({ id: Number(updateProductDto.category) });
    if (!category) {
      throw createError(400, `Category with id ${updateProductDto.category} not found`);
    }
    product.category = category;
  }
  product.slug = updateProductDto.slug || (productName ? buildSlug(productName) : product.slug);

  return productRepository.save(product);
};

/** delete product */
const deleteRecord = async (id: string) => {
  const product = await findById(id);
  return productRepository.remove(product);
};

const getHomeProductsByCategory = async (categoryId: string, limit: number) => {
  return productRepository.find({
    where: { category: { id: Number(categoryId) } },
    relations: { category: true },
    take: limit,
  });
};

const getProductsByCategoryId = async (catId: string, query: QueryParams) => {
  return findAll({ ...query, category: catId, limit: query.limit || 20 });
};

export default {
  findAll,
  findById,
  create,
  update,
  deleteRecord,
  getHomeProductsByCategory,
  getProductsByCategoryId
};
