import { Document} from 'mongoose';

export interface IBrand extends Document {
        brand_name: string;
        description?: string;
        slug: string;
}

export interface IBrandDTO {
        brand_name: string;
        description?: string;
        slug: string;
}