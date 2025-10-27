import { ObjectId } from "mongoose";

export interface IProductDTO {
    product_name: string;
    description?: string;
    slug: string;
    price?: number;
    discount?: number;
    modelYear: number;
    thumbnail?: string;
    stock?: number;
    category: ObjectId;
    brand: ObjectId;
}

export interface IProduct {
    _id: ObjectId;
    product_name: string;
    description?: string;
    slug: string;
    price?: number;
    discount?: number;
    modelYear: number;
    thumbnail?: string;
    stock?: number;
    category: ObjectId;
    brand: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
