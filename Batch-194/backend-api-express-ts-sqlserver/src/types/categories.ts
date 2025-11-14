
export interface ICategoryDTO {
    category_name: string
    description: string
    slug: string
}

export interface ICategory{
    id: number;
    category_name: string
    description?: string
    slug: string
}