export interface IProduct {
    _id: string;
    product_name: string;
    price: number;
    stock: number;
    modelYear: number;
}

export interface IProductDTO {
    product_name: string;
    price: number;
    discount?: number;
    description?: string;
    stock: number;
    modelYear: number;
    thumbnail?: string;
    slug: string;
    category: string;
    brand: string;
}