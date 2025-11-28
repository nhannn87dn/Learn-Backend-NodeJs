import axios from 'axios';
import ENV from '../../configs/ENV';

interface ICategory {
    _id: string;
    category_name: string;
    slug: string;
}


export const getCategoriesTree = async() : Promise<{data:ICategory[]}> =>  {
    const response = await axios.get(`${ENV.BACKEND_URL_API}/v1/categories/tree`);
    return response.data;
}

export interface IProduct {
    _id: string;
    product_name: string;
    price: number;
    slug: string;
    thumbnail: string;
}

export const getProductsHomeByCategoryId = async({
    id,
    limit = 5
}: {
    id: string;
    limit?: number;
}) : Promise<{data:IProduct[]}> =>  {
    const response = await axios.get(`${ENV.BACKEND_URL_API}/v1/products/home-products`, {
        params: { 
            limit, 
            cat_id: id 
        }
    });
    return response.data;
}