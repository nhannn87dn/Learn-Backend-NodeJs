export interface IBrand {
    id: number;
    brand_name: string;
    description: string;
    slug: string;
}

export interface IBrandCreate {
    brand_name: string;
    description: string;
    slug: string;
}

export interface IBrandUpdate {
    brand_name?: string;
    description?: string;
    slug?: string;
}
