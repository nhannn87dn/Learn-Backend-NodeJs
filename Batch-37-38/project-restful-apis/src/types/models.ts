import {ObjectId} from 'mongoose';

export interface ICategory {
    categoryName: string,
    description?: string,
    slug: string,
    sort: number,
    isActive: boolean,

}


export interface IProduct {
    productName: string,
    description?: string,
    slug: string,
    price?: number,
    stock?: number,
    discount?: number,
    modelYear?: string,
    thumbnail?: string,
    category: ObjectId


}
