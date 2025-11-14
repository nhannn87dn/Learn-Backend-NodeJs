export interface IProductDTO {
    product_name: string;
    description: string;
    slug: string;
    price: number;
    discount: number;
    model_year: number;
    thumbnail: string;
    stock: number;
    category: number;
}

export interface IProduct {
    id: number;
    product_name: string;
    description: string;
    slug: string;
    price: number;
    discount: number;
    model_year: number;
    thumbnail?: string;
    stock: number;
    category: number;

}
