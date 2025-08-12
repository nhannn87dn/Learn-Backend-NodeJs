import { env } from '@/constants/env';
import axios from 'axios';

interface Category {
    _id: string;
    category_name: string;
    slug: string;
}

export const getCategoryTree = async (): Promise<Category[]> => {
    const response = await axios.get(`${env.BACKEND_URL_API}/v1/categories/tree`);
    return response.data.data;
};

