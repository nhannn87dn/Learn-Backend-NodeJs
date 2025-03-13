import { IResponse } from "./response";

export interface ICategory {
    _id: string;
    category_name: string;
    description: string;
    slug: string;
}

export interface ICategoryResponse extends IResponse{
    data: ICategory[]
}