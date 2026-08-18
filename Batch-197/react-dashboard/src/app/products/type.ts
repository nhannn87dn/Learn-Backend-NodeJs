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

/* payload khi thêm mới */
export type IProductCreateDTO = {
    product_name: string
    description?: string;
    price?: number;
    discount: number;
    category: string;
    brand: string;
    model_year: number;
    thumbnail?: string;
    stock?: number;
}
/* payload khi update */
export type IProductUpdateDTO = Partial<IProductCreateDTO> & {
    _id: string
}