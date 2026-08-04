import { buildSlug } from "../helpers/buildSlug.helper";
import Product from "../models/product.model";
import { CreateProductDto, UpdateProductDto } from "../types/product";
import createError from "http-errors";
/**
 * Lấy tất cả sản phẩm
 * @returns
 */

type QueryParams = {
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
  brand?: string;
  sortBy?: string;
  sortType?: "asc" | "desc";
};

const findAll = async (query: QueryParams) => {
  console.log("<<=== 🚀 query ===>>", query);
  const { limit = 10, page = 1, search = "" } = query;

  let filter = {};
  // Tìm kiếm theo tên sản phẩm (product_name) nếu có tham số search
  if (search && search.trim() !== "") {
    filter = { ...filter, product_name: { $regex: search, $options: "i" } };
  }
  // Lọc theo category nếu có tham số category
  if (query.category && query.category.trim() !== "") {
    filter = { ...filter, category: query.category };
  }

  // Lọc theo brand nếu có tham số brand
  if (query.brand && query.brand.trim() !== "") {
    filter = { ...filter, brand: query.brand };
  }
  // TODO: Thêm những điều kiện lọc khác nếu cần thiết

  //Sắp xếp dựa vào sortType, sortBy nếu có trong query, mặc định sắp xếp theo ngày tạo giảm dần (mới nhất trước)
  const sortType = query.sortType || "desc";
  const sortBy = query.sortBy || "createdAt";

  const sortOptions: Record<string, 1 | -1> = {};
  sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

  //Truy vấn cơ sở dữ liệu với các điều kiện lọc, phân trang và sắp xếp
  const products = await Product.find({
    ...filter,
  })
    .select("-__v -createdAt -updatedAt") // loại bỏ trường __v khỏi kết quả
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({
      ...sortOptions,
    }); // sắp xếp theo ngay tạo giảm dần (mới nhất trước)

    //Đếm tổng số sản phẩm thỏa mãn điều kiện lọc để tính toán phân trang
  const total = await Product.countDocuments({
    ...filter,
  });

  return {
    records: products,
    metadata: {
      limit: Number(limit),
      page: Number(page),
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/** Lấy sản phẩm theo id */

const findById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createError(400, `Product with id ${id} not found`);
  }
  return product;
};

/** create new product */
const create = async (createProductDto: CreateProductDto) => {
  /*
    Tự động tạo slug từ product_name nếu slug không được cung cấp trong createProductDto.
    Nếu slug được cung cấp, sử dụng slug đó.
    */
  if (!createProductDto.slug) {
    createProductDto.slug = buildSlug(
      createProductDto.product_name.toLowerCase(),
    );
  }

  const product = new Product(createProductDto);
  await product.save();
  return product;
};

/** update product */

const update = async (id: string, updateProductDto: UpdateProductDto) => {
  //step 1: check product exist
  const product = await findById(id);

  //step 2: update product
  //merge thay đổi vào product
  Object.assign(product, updateProductDto);

  //step 3: save product
  await product.save();
  return product;
};

/** delete product */
const deleteRecord = async (id: string) => {
  //step 1: check product exist
  const product = await findById(id);
  //step 2: delete product
  await product.deleteOne();
  return product;
};

export default {
  findAll,
  findById,
  create,
  update,
  deleteRecord,
};
