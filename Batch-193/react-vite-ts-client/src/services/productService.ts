import { env } from '@/constants/env';
import axios from 'axios';

export interface Product {
    _id: string;
    product_name: string;
    slug: string;
    price: number;
    discount: number;
    thumbnail: string;
    model_year: number;
}

export interface ProductResponse {
    products: Product[];
    page: number;
    limit: number;
    totalRecords: number;
}

export const getProductHome = async ({
    catId,
    limit = 5
}: {catId: string, limit?: number}): Promise<Product[]> => {
    const response = await axios.get(`${env.BACKEND_URL_API}/v1/products/home/${catId}?limit=${limit}`);
    return response.data.data;
};

export const getProductByCategorySlug = async (slug: string): Promise<ProductResponse> => {
    const response = await axios.get(`${env.BACKEND_URL_API}/v1/products/category/${slug}`);
    return response.data.data;
};
