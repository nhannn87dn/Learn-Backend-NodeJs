import createError from "http-errors";
import { brands } from "../databases/db";

const findAll = () => {
  //buộc phải có return
  return brands;
};

const findById = (id: number) => {
  const brand = brands.find((cat) => cat.id === id);
  if (!brand) {
    throw createError(400, "brand not found");
  }
  return brand;
};

const create = (payload: { name: string }) => {
  const newbrand = {
    id: brands.length + 1,
    name: payload.name,
  };
  brands.push(newbrand);
  return newbrand;
};

const updateById = (id: number, payload: { name: string }) => {
  const brandIndex = brands.findIndex((cat) => cat.id === id);

  if (brandIndex === -1) {
    throw createError(400, "brand not found");
  }
  brands[brandIndex].name = payload.name;

  return brands[brandIndex];
};

const deleteById = (id: number) => {
  const brandIndex = brands.findIndex((cat) => cat.id ===id);

  if (brandIndex === -1) {
    throw createError(400, "brand not found");
  }

  brands.splice(brandIndex, 1);
  return brands
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
