import createError from "http-errors";
import Category from "../models/category.model";

const categories = [
  { id: 1, name: "laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Accessories" },
];

/* get ALl categories */
const findAll = async () => {
  //Lay du lieu trong DB
  // return lai cho controller
  const result = await Category.find();
  return result;
};

/* get Single Category */
const findOne = (id: number) => {
  const category = categories.find((c) => c.id === id);
  /* check su ton tai cua category */
  if (!category) {
    throw createError(400, "Category not found", { data: category });
  }
  return category;
};

/* create a new category */
const create = async (payload: any) => {
  console.log("<<=== 🚀 payload ===>>", payload);
  const category = await Category.create(payload);
  return category;
};

/* update a category */
const updateById = (id: number, payload: any) => {
  //kiem tra su ton tai
  const category = findOne(id);

  const result = categories.map((c) => {
    if (c.id === category.id) {
      c.name = payload.name; // gan lai ten moi
    }
    return c;
  });
  return result;
};

/* delete a category */
const deleteById = (id: number) => {
  //kiem tra su ton tai
  const category = findOne(id);

  const result = categories.filter((c) => c.id !== category.id);
  return result;
};

export default {
  findAll,
  findOne,
  create,
  updateById,
  deleteById,
};
