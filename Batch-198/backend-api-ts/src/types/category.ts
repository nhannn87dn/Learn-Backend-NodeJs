export type Category = {
    _id: string;
    category_name: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryCreateDTO = Omit<Category, '_id' | 'createdAt' | 'updatedAt'>;