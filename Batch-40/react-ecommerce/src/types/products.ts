import { ICategory } from "./categories";
import { IPagination } from "./response";

export interface IProduct {
    _id: string;
    product_name: string;
    price: number;
    thumbnail: string;
    description: string;
    category: ICategory;
    stock: number;
    model_year: number;
    discount: number;
    slug: string
}

export interface IProductList {
    products: IProduct[];
    pagination: IPagination;
}