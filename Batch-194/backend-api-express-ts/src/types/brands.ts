import { ObjectId } from "mongoose";

export interface IBrandDTO {
    brand_name: string
    description?: string
    slug: string
}

export interface IBrand{
    _id: ObjectId;
    brand_name: string
    description?: string
    slug: string
}