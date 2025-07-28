
import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { IBrand, IBrandCreate, IBrandUpdate } from '../types/brand';

const BRAND_PATH = path.join(__dirname, '../databases/brand.json');

async function getAllBrands(): Promise<IBrand[]> {
  try {
    const data = await readFile(BRAND_PATH);
    return Array.isArray(data) ? (data as IBrand[]) : [];
  } catch {
    return [];
  }
}

const findAll = async (query: any) => {
  let brands: IBrand[] = await getAllBrands();
  return {
    data: brands,
    totalRecords: brands.length,
    page: query.page || 1,
    limit: query.limit || 10,
    totalPages: Math.ceil(brands.length / (query.limit || 10)),
  };
};

const findById = async (id: string) => {
  const brands = await getAllBrands();
  const brand = brands.find((b: IBrand) => String(b.id) === String(id));
  if (!brand) throw createError(404, "Brand not found");
  return brand;
};

const create = async (payload: IBrandCreate) => {
  const brands = await getAllBrands();
  const newBrand: IBrand = {
    ...payload,
    id: brands.length > 0 ? brands[brands.length - 1].id + 1 : 1,
  };
  brands.push(newBrand);
  await writeFile(BRAND_PATH, brands);
  return newBrand;
};

const updateById = async (id: string, payload: IBrandUpdate) => {
  const brands = await getAllBrands();
  const idx = brands.findIndex((b: IBrand) => String(b.id) === String(id));
  if (idx === -1) throw createError(404, "Brand not found");
  brands[idx] = { ...brands[idx], ...payload };
  await writeFile(BRAND_PATH, brands);
  return brands[idx];
};

const deleteById = async (id: string) => {
  const brands = await getAllBrands();
  const idx = brands.findIndex((b: IBrand) => String(b.id) === String(id));
  if (idx === -1) throw createError(404, "Brand not found");
  const deleted = brands.splice(idx, 1)[0];
  await writeFile(BRAND_PATH, brands);
  return deleted;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
