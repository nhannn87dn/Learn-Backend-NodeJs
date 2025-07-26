export interface ICategory {
    id: number;
    category_name: string;
    description: string;
    slug: string;
}

export interface ICategoryCreate {
    category_name: string;
    description: string;
    slug: string;
}

export interface ICategoryUpdate {
    category_name?: string;
    description?: string;
    slug?: string;
}

