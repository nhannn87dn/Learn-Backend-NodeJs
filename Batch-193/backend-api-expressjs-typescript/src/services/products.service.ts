import createError from "http-errors";
import Product from "../models/Product.model";

const findAll = async (query: any) => {
  console.log('<<=== 🚀 query ===>>',query);
  const { page = 1, limit = 5, keyword = null, sort_type = 'desc', sort_by='createdAt', cat_id = null, brand_id = null } = query;

  console.log('<<=== 🚀 keyword ===>>',keyword);

  let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

  const where: any = {};
  //Nếu cần lọc thì đưa vào where
  if(keyword) {
    where.product_name = { $regex: keyword, $options: 'i' };
  }
  if(cat_id) {
    where.category_id = cat_id;
  }
  if(brand_id) {
    where.brand_id = brand_id;
  }

  const skip = (page - 1) * limit;
  const products = await Product.find({
    ...where,
  })
    .skip(skip)
    .limit(limit)
    .sort({...sortObject})
    .populate("category_id", "category_name")
    .populate("brand_id", "brand_name");
  return {
    products,
    page,
    limit,
    totalRecords: await Product.countDocuments(),
  };
};

const findById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createError(400, "Product not found");
  }
  return product;
};

const create = (payload: any) => {
  const newProduct = new Product({
    product_name: payload.product_name,
    description: payload.description,
    price: payload.price,
    discount: payload.discount,
    stock: payload.stock,
    model_year: payload.model_year,
    category_id: payload.category_id,
    brand_id: payload.brand_id,
    slug: payload.slug,
    thumbnail: payload.thumbnail,
  });
  newProduct.save();
  return newProduct;
};

const updateById = async (id: string, payload: any) => {
  const product = await findById(id);
  Object.assign(product, payload);
  await product.save();
  return product;
};

const deleteById = async (id: string) => {
  const product = await findById(id);
  await Product.findByIdAndDelete(product._id);
  return product;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
