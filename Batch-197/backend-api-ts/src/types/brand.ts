export type TBrand = {
    id: number;
    brand_name: string;
    description: string;
}

export type CreateBrandDto = {
    brand_name: string;
    description?: string;
    slug?: string;
}

export type UpdateBrandDto = Partial<CreateBrandDto>;