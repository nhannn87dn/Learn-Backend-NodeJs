import { Product } from '../entities/product.entity';
import { myDataSource } from "../data-soucre";
import {  MoreThan } from 'typeorm';
import { IProductDTO } from '../types/product.type';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import createError from 'http-errors';

const productRepository = myDataSource.getRepository(Product);

const findAllProducts = async (query: any) => {
  //TH 1. SELECT * FROM products
  const products = await productRepository.find();
    return products;
};

const findProductSomeFields = async (query: any) => {
  //TH 2. SELECT product_name, price FROM products
  const products = await productRepository.find({
    select: {
      product_name: true,
      price: true,
      stock: true,
      slug: true,
    }
  });
    return products;
};

//SELECT With WHERE condition
//SELECT product_name, price FROM products WHERE price > 1000
const findProductWithCondition = async (query: any) => {
  const products = await productRepository.find({
    select: {
      product_name: true,
      price: true,
      stock: true,
      slug: true,
    },
    where: {
      price: MoreThan(1000) // > 1000
      // price: LessThan(1000) // < 1000
      // price: 1000 // = 1000
    }
  });
    return products;
}

//SELECT with relationships
//SELECT product_name, price FROM products 
// JOIN categories ON products.category_id = categories.id
const findProductWithRelation = async (query: any) => {
  const products = await productRepository.find({
    select: {
      product_name: true,
      price: true,
      stock: true,
      slug: true,
      category: {
        category_name: true, //chỉ lấy category_name từ bảng category, các trường khác sẽ không được lấy ra
      }
    },
    relations: {
      category: true,
    }
  });
  return products;
}
//SELECT with order by
//SELECT product_name, price FROM products ORDER BY price DESC
const findProductWithOrder = async (query: any) => {
  const products = await productRepository.find({
    select: {
      product_name: true,
      price: true,
      stock: true,
      slug: true,
    },
    order: {
      price: 'DESC', // Sắp xếp theo giá giảm dần
      // price: 'ASC', // Sắp xếp theo giá tăng dần
    }
  });
  return products;
}

//SELECT with pagination
//SELECT product_name, price FROM products LIMIT 10 OFFSET 20
const findProductWithPagination = async (query: any) => {
  const page = Number(query.page) || 1; // Trang hiện tại, mặc định là 1
  const limit = Number(query.limit) || 10; // Số sản phẩm trên mỗi trang, mặc định là 10
  const offset = (page - 1) * limit; // Tính toán vị trí bắt đầu
  const [products, totalProduct] = await productRepository.findAndCount({
    select: {
      id: true,
      product_name: true,
      price: true,
      stock: true,
      slug: true,
      category: {
        category_name: true, //chỉ lấy category_name từ bảng category, các trường khác sẽ không được lấy ra
      }
    },
    relations: {
      category: true,
    },
    order: {
      id: 'DESC', //mục đích để sp mới thêm luôn nằm đầu danh sách
    },
    skip: offset, // Bỏ qua số sản phẩm đã tính toán
    take: limit, // Lấy số sản phẩm theo giới hạn
  });
  return {
    items: products,
      pagination: {
          totalItems: totalProduct,
          totalPages: Math.ceil(totalProduct / limit),
          currentPage: page,
          pageSize: limit,
      }
  };
}

//Find By ID
const getProductById = async (id: number) => {
  const product = await productRepository.findOne({
    select: {
      id: true,
      product_name: true,
      price: true,
      stock: true,
      slug: true,
      category: {
        category_name: true,
      },
      brand: {
        brand_name: true,
      }
    },
    where: { id },
    relations: {
      category: true,
      brand: true,
    }
  });
  return product;
}

//create new product
const createProduct = async (payload: IProductDTO) => {
  //step 1: validate unique slug, product_name if needed
  //step 2: validate category_id, brand_id if needed
  //step n: upload images if needed
  // step final: create new product

  const normalizedSlug = payload.slug.trim().toLowerCase();
  const normalizedProductName = payload.product_name.trim();

  const existedProduct = await productRepository.findOne({
    where: [{ slug: normalizedSlug }, { product_name: normalizedProductName }],
  });
  if (existedProduct) {
    throw createError(400, 'Product name or slug already exists');
  }

  //lấy category, brand từ database để gán vào product
  const category = await myDataSource
    .getRepository(Category)
    .findOneBy({ id: payload.category });
  if (!category) {
    throw createError(400, 'Category not found');
  }

  const brand = await myDataSource
    .getRepository(Brand)
    .findOneBy({ id: payload.brand });
  if (!brand) {
    throw createError(400, 'Brand not found');
  }

  
  const product = productRepository.create({
    product_name: normalizedProductName,
    description: payload.description ? payload.description.trim() : '',
    slug: normalizedSlug,
    price: Number(payload.price) || 0,
    discount: Number(payload.discount) || 0,
    category: category,
    brand: brand,
    stock: Number(payload.stock) || 0,
    thumbnail: payload.thumbnail ? payload.thumbnail.trim() : null,
    model_year: Number(payload.model_year) || 0,
  });
  await productRepository.save(product);
  // trả về kết quả tạo mới
  return product;
};

//update product by id
const updateProductById = async (id: number, payload: IProductDTO) => {
  const product = await productRepository.findOneBy({ id });
  if (!product) {
    throw createError(404, 'Product not found');
  }
  //có thể validate unique slug, product_name nếu cần
  //có thể validate category_id, brand_id nếu cần
  //có thể upload images nếu cần
  // cập nhật thông tin sản phẩm
  //nếu có các trường thì cập nhật, còn ko để lại giá trị cũ
  product.product_name = payload.product_name ? payload.product_name.trim() : product.product_name;
  product.description = payload.description ? payload.description.trim() : product.description;
  product.slug = payload.slug ? payload.slug.trim().toLowerCase() : product.slug;
  product.price = payload.price !== undefined ? Number(payload.price) : product.price;
  product.discount = payload.discount !== undefined ? Number(payload.discount) : product.discount;
  product.stock = payload.stock !== undefined ? Number(payload.stock) : product.stock;
  product.model_year = payload.model_year !== undefined ? Number(payload.model_year) : product.model_year;
  product.thumbnail = payload.thumbnail ? payload.thumbnail.trim() : product.thumbnail;

  //nếu payload có category thì mới update, nếu không có thì giữ nguyên category cũ
  if (payload.category) {
    const category = await myDataSource
      .getRepository(Category)
      .findOneBy({ id: payload.category });
    if (!category) {
      throw createError(400, 'Category not found');
    }
    product.category = category;
  }

  //nếu payload có brand thì mới update, nếu không có thì giữ nguyên brand cũ
  if (payload.brand) {
    const brand = await myDataSource
      .getRepository(Brand)
      .findOneBy({ id: payload.brand });
    if (!brand) {
      throw createError(400, 'Brand not found');
    }
    product.brand = brand;
  }

  await productRepository.save(product);
  return product;
}

//delete product by id
const deleteProductById = async (id: number) => {
  const product = await productRepository.findOneBy({ id });
  if (!product) {
    throw createError(404, 'Product not found');
  }
  await productRepository.remove(product);
  return product;
};

export default {
    findAllProducts,
    findProductSomeFields,
    findProductWithCondition,
    findProductWithRelation,
    findProductWithOrder,
    findProductWithPagination,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}