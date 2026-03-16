import { Document} from 'mongoose';

export interface ICategory extends Document {
        category_name: string;
        description?: string;
        slug: string;
}

export interface ICategoryDTO {
        category_name: string;
        description?: string;
        slug: string;
}