import { Document} from 'mongoose';

export interface ICategory extends Document {
        category_name: string;
        description?: string;
        slug: string;
}
