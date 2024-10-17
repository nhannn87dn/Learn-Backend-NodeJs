import createError from "http-errors";

const categories = [
  { id: 1, name: "laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Accessories" },
];

/* get ALl categories */
const findAll = () => {
  //Lay du lieu trong DB
  // return lai cho controller
  return categories;
};

/* get Single Category */
const findOne = (id: number) => {
  const category = categories.find((c) => c.id === id);
  /* check su ton tai cua category */
  if (!category) {
    throw createError(400, "Category not found");
  }
  return category;
};

/* create a new category */
const create = (payload: any) => {
  return payload;
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
