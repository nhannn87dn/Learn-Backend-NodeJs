import { ObjectId} from 'mongoose';

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

export interface IProduct extends IProductDTO {
        _id: ObjectId;
}