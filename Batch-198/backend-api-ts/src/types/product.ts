export type Product = {
    _id: string;
    product_name: string;
    description: string;
    price?: number;
    discount?: number;
    model_year?: number;
    stock?: number;
    thumbnail?: string;
    slug: string;
    brand?: string; // _id của Brand
    category?: string; // _id của Category
    createdAt: Date;
    updatedAt: Date;
}

export type ProductCreateDTO = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>;
