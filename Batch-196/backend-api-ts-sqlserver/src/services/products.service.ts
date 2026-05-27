import createError from "http-errors";
import { Product } from "../entities/Product.entity";
import { CreateProductDto, UpdateProductDto } from "../types/product.type";
import { myDataSource } from "../dataSource";

// khởi tạo repository cho entity Product
const productRepository = myDataSource.getRepository(Product);

const query = async (query: unknown) => {
  //TH1.SELECT * FROM products
  //const products = await productRepository.find();
  //TH 2. SELECT some fields
  // const products = await productRepository
  // .find({
  //   select: {
  //     id: true,
  //     productName: true,
  //   }
  // });
  //Th3: SELECT with WHERE
   const products = await productRepository
  .find({
    select: {
      id: true,
      productName: true,
      price: true,
      modelYear: true,
      category: {
        categoryName: true,
      },
      brand: {
        brandName: true,
      }
    },
    relations: {
      category: true,
      brand: true,
    },
    where: {
      modelYear: 2022,
    }
  });
  return products;
}

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng cho Product,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

/**
 * @desc Get all list Products with pagination and filters
 * @route GET /api/v1/products
 * @returns Promise<Object> with data and pagination
 */
const findAll = async (query: any) => {
  // phân trang
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  let where: any = {};

  // filter by category
  if (query.categoryId && query.categoryId !== "") {
    where.categoryId = query.categoryId;
  }

  // filter by brand
  if (query.brandId && query.brandId !== "") {
    where.brandId = query.brandId;
  }

  // search by keyword
  if (query.keyword && query.keyword !== "") {
    where.productName = query.keyword; // will use ILike for case-insensitive search
  }

  const queryBuilder = productRepository.createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category")
    .leftJoinAndSelect("product.brand", "brand")
    .select(["product", "category.id", "category.categoryName", "brand.id", "brand.brandName"]);

  // apply filters
  if (where.categoryId) {
    queryBuilder.andWhere("product.categoryId = :categoryId", { categoryId: where.categoryId });
  }

  if (where.brandId) {
    queryBuilder.andWhere("product.brandId = :brandId", { brandId: where.brandId });
  }

  if (where.productName) {
    queryBuilder.andWhere("product.productName LIKE :productName", { productName: `%${where.productName}%` });
  }

  // count total records before pagination
  const totalRecords = await queryBuilder.getCount();

  // apply pagination and sorting
  const products = await queryBuilder
    .orderBy("product.price", "ASC")
    .skip(skip)
    .take(limit)
    .getMany();

  return {
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalRecords / limit),
      totalRecords,
    },
  };
};

/**
 * @desc Get Product by ID or throw error
 * @param id number
 * @returns Product
 */
const getByIdOrFail = async (id: number) => {
  const product = await productRepository.findOne({
    where: { id },
    relations: {
      category: true,
      brand: true
    }
  });
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
  const newProduct = productRepository.create({
    productName: createProductDto.productName,
    price: createProductDto.price,
    discount: createProductDto.discount || 0,
    categoryId: createProductDto.categoryId,
    brandId: createProductDto.brandId,
    description: createProductDto.description,
    modelYear: createProductDto.modelYear,
    slug: createProductDto.slug,
    thumbnail: createProductDto.thumbnail,
    stock: createProductDto.stock || 0,
  });

  return await productRepository.save(newProduct);
};

/**
 * @desc Update a product by ID
 * @param id number
 * @param updateProductDto UpdateProductDto
 * @returns Product
 */
const updateById = async (id: number, updateProductDto: UpdateProductDto) => {
  // step 1: check if product exists
  const product = await getByIdOrFail(id);

  // step 2: update fields if they are provided
  if (updateProductDto.productName !== undefined) {
    product.productName = updateProductDto.productName;
  }
  if (updateProductDto.price !== undefined) {
    product.price = updateProductDto.price;
  }
  if (updateProductDto.discount !== undefined) {
    product.discount = updateProductDto.discount;
  }
  if (updateProductDto.categoryId !== undefined) {
    product.categoryId = updateProductDto.categoryId;
  }
  if (updateProductDto.brandId !== undefined) {
    product.brandId = updateProductDto.brandId;
  }
  if (updateProductDto.description !== undefined) {
    product.description = updateProductDto.description;
  }
  if (updateProductDto.modelYear !== undefined) {
    product.modelYear = updateProductDto.modelYear;
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

  return await productRepository.save(product);
};

/**
 * @desc Delete a product by ID
 * @param id number
 * @returns Product
 */
const deleteById = async (id: number) => {
  // step 1: check if product exists
  const product = await getByIdOrFail(id);
  // step 2: remove it
  await productRepository.remove(product);
  return product;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
  query
};
