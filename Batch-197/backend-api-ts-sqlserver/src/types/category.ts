export type TCategory = {
    id: number;
    category_name: string;
    description: string;
}

export type CreateCategoryDto = {
    category_name: string;
    description?: string;
    slug?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;