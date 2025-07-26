export interface IProduct {
    id: number;
    product_name: string;
    price: number;
    discount: number;
    category_id: number;
    brand_id: number;
    description: string;
    model_year: number;
    stock: number;
    thumbnail: string;
    slug: string;
}

export interface IProductCreate {
    product_name: string;
    price: number;
    discount: number;
    category_id: number;
    brand_id: number;
    description: string;
    model_year: number;
    stock: number;
    thumbnail: string;
    slug: string;
}

export interface IProductUpdate {
    product_name?: string;
    price?: number;
    discount?: number;
    category_id?: number;
    brand_id?: number;
    description?: string;
    model_year?: number;
    stock?: number;
    thumbnail?: string;
    slug?: string;
}
