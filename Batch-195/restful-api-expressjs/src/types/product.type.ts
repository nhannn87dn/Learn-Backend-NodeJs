import { Document, ObjectId} from 'mongoose';

export interface IProduct extends Document {
        _id: ObjectId;
        product_name: string;
        description?: string;
        slug: string;
        price: number;
        discount: number;
        category: ObjectId;
        brand: ObjectId;
        stock: number;
        thumbnail?: string;
        modelYear: number;
}
export interface IProductDTO {
        product_name: string;
        description?: string;
        slug: string;
        price: number;
        discount: number;
        category: string;
        brand: string;
        stock: number;
        thumbnail?: string;
        modelYear: number;
}
