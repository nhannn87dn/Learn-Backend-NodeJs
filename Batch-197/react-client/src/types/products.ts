export type IProduct = {
    _id: string
    product_name: string
    price: number;
    discount: number;
    category: {
        _id: string;
        category_name: string;
    };
    description?: string;
    slug: string;
    brand: {
        _id: string;
        brand_name: string;
    };
    model_year: number;
    thumbnail: string;
    stock: number;
}
