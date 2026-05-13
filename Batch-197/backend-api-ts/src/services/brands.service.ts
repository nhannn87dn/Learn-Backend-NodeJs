import createError from "http-errors";

/**
 * Service là nơi chứa logic nghiệp vụ của ứng dụng,
 * nó sẽ tương tác với database để thực hiện các thao tác CRUD
 * và trả về kết quả cho controller thông qua return statement
 */

const brands = [
  { id: 1, name: "Trek", description: "A leading brand in bicycles" },
  { id: 2, name: "Giant", description: "Known for high-quality mountain bikes" },
  { id: 3, name: "Specialized", description: "Specializes in road and mountain bikes" },
];

const findAll = async () => {
  return brands;
};

const getByIdOrFail = async (id: string) => {
  const brand = brands.find((b) => b.id === parseInt(id)); 
    if (!brand) {
        throw createError(404, 'Brand not found');
    }
    return brand;
}

const create = async (name: string, description: string) => {
    const newBrand = {
        id: brands.length + 1,
        name,
        description
    };
    brands.push(newBrand);
    return newBrand;
};

const updateById = async (id: string, name: string, description: string) => {
    //step 1: check if brand exists
    const brand =  await getByIdOrFail(id);
    //step 2: if exist,then update the name and description
    brand.name = name;
    brand.description = description;
    return brand;
};

const deleteById = async (id: string) => {
    //step 1: check if brand exists
    const brand = await getByIdOrFail(id);
    //step 2: if exist, then remove it
    const index = brands.indexOf(brand);
    brands.splice(index, 1);
    return brand;
};

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
};