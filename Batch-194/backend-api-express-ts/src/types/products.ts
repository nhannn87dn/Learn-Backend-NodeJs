import { io } from 'socket.io-client';
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
    isNew?: boolean;
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
     isNew?: boolean;
}
