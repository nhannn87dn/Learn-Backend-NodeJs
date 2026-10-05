export type Brand = {
    _id: string;
    brand_name: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export type BrandCreateDTO = Omit<Brand, '_id' | 'createdAt' | 'updatedAt'>;
