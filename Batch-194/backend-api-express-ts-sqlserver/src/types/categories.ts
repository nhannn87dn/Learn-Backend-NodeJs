import { ObjectId } from "mongoose";

export interface ICategoryDTO {
    category_name: string
    description?: string
    slug: string
}

export interface ICategory{
    _id: ObjectId;
    category_name: string
    description?: string
    slug: string
}