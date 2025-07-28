import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { IProduct, IProductCreate, IProductUpdate } from '../types/product';

const PRODUCT_PATH = path.join(__dirname, '../databases/product.json');

async function getAllProducts(): Promise<IProduct[]> {
  try {
    let data = await readFile(PRODUCT_PATH);
    return Array.isArray(data) ? (data as IProduct[]) : [];
  } catch {
    return [];
  }
}

const findAll = async (query: any) => {
  let data: IProduct[] = await getAllProducts();
  if(query.category_id){
    data = data.filter((p: IProduct) => p.category_id === query.category_id);
  }
  //filter by brand_id
  if(query.brand_id){
    data = data.filter((p: IProduct) => p.brand_id === query.brand_id);
  }
  //filter by product_name
  if(query.product_name){
    data = data.filter((p: IProduct) => p.product_name.toLowerCase().includes(query.product_name.toLowerCase()));
  }
  return {
    data,
    totalRecords: data.length,
    page: query.page || 1,
    limit: query.limit || 10,
    totalPages: Math.ceil(data.length / (query.limit || 10)),
  };
};

const findById = async (id: string) => {
  const products = await getAllProducts();
  const product = products.find((p: IProduct) => String(p.id) === String(id));
  if (!product) throw createError(404, "Product not found");
  return product;
};

const create = async (payload: IProductCreate) => {
  const products = await getAllProducts();
  const newProduct: IProduct = {
    ...payload,
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
  };
  products.push(newProduct);
  await writeFile(PRODUCT_PATH, products);
  return newProduct;
};

const updateById = async (id: string, payload: IProductUpdate) => {
  const products = await getAllProducts();
  const idx = products.findIndex((p: IProduct) => String(p.id) === String(id));
  if (idx === -1) throw createError(404, "Product not found");
  products[idx] = { ...products[idx], ...payload };
  await writeFile(PRODUCT_PATH, products);
  return products[idx];
};

const deleteById = async (id: string) => {
  const products = await getAllProducts();
  const idx = products.findIndex((p: IProduct) => String(p.id) === String(id));
  if (idx === -1) throw createError(404, "Product not found");
  const deleted = products.splice(idx, 1)[0];
  await writeFile(PRODUCT_PATH, products);
  return deleted;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
