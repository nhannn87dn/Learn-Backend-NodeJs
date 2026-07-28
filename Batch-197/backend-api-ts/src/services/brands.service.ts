import { readFile, writeFile } from '../helpers/file.helper';
import { TBrand } from '../types/brand';


const fileName = 'src/database/brand.json';


//Get All Brands
const findAll = () => {
    const brands: TBrand[] = readFile(fileName);
    return brands;
}

//Get Brand by ID
const findById = (id: number) => {
    const brands: TBrand[] = readFile(fileName);

    const brand = brands.find((b) => b.id === id);

    if (!brand) {
        throw new Error(`Brand with id ${id} not found`);
    }

    return brand;
}

//create a new brand
const create = (payload: Omit<TBrand, 'id'>) => {
    const brands: TBrand[] = readFile(fileName);

    const newBrand: TBrand = {
        id: brands.length + 1,
        brand_name: payload.brand_name,
        description: payload.description,
    };

    brands.push(newBrand);
    writeFile(fileName, brands);

    return newBrand;
}

//update a brand by id
const updateById = (id: number, payload: Partial<Omit<TBrand, 'id'>>) => {
    const brands: TBrand[] = readFile(fileName);

    const brand = brands.find((b) => b.id === id);
    if (!brand) {
        throw new Error(`Brand with id ${id} not found`);
    }

    const updatedBrands = brands.map((b) => {
        if (b.id === id) {
            return {
                ...b,
                brand_name: payload.brand_name || b.brand_name,
                description: payload.description || b.description,
            };
        }
        return b;
    });

    writeFile(fileName, updatedBrands);

    const brandUpdated = updatedBrands.find((b) => b.id === id);
    return brandUpdated;
}

//delete a brand by id
const deleteById = (id: number) => {
    const brands: TBrand[] = readFile(fileName);

    const brand = brands.find((b) => b.id === id);
    if (!brand) {
        throw new Error(`Brand with id ${id} not found`);
    }

    const updatedBrands = brands.filter((b) => b.id !== id);

    writeFile(fileName, updatedBrands);
    return brand;
}


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}