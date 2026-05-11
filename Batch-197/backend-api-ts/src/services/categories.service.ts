import createError from "http-errors";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

const categories = [
  { id: 1, name: "Road" },
  { id: 2, name: "Mountain" },
  { id: 3, name: "Hybrid" },
];

const findAll = async () => {
  return categories;
};

const getByIdOrFail = async (id: string) => {
  const category = categories.find((c) => c.id === parseInt(id)); 
    if (!category) {
        throw createError(404, 'Category not found');
    }
    return category;
}

const create = async (name: string) => {
    const newCategory = {
        id: categories.length + 1,
        name
    };
    categories.push(newCategory);
    return newCategory;
};

const updateById = async (id: string, name: string) => {
    //step 1: check if category exists
    const category =  await getByIdOrFail(id);
    //step 2: if exist,then update the name
    category.name = name;
    return category;
};

const deleteById = async (id: string) => {
    //step 1: check if category exists
    const category = await getByIdOrFail(id);
    //step 2: if exist, then remove it
    const index = categories.indexOf(category);
    categories.splice(index, 1);
    return category;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};