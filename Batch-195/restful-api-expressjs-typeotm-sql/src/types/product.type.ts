
export interface IProductDTO {
        product_name: string;
        description?: string;
        slug: string;
        price: number;
        discount: number;
        category: number;
        brand: number;
        stock: number;
        thumbnail?: string;
        model_year: number;
}

export interface IProduct extends IProductDTO {
        id: number;
}