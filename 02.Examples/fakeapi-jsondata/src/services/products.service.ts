import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { IProduct, IProductCreate, IProductUpdate } from '../types/product';

const PRODUCT_PATH = path.join(__dirname, '../databases/product.json');

async function getAllProducts(): Promise<IProduct[]> {
  try {
    const data = await readFile(PRODUCT_PATH);
    return Array.isArray(data) ? (data as IProduct[]) : [];
  } catch {
    return [];
  }
}

const findAll = async () => {
  let products: IProduct[] = await getAllProducts();
  return products;
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
