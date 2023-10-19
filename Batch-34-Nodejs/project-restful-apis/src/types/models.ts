import { ObjectId, Date } from "mongoose";

export interface ICategory {
  _id?: ObjectId;
  name: string;
  description: string;
}

export interface ISupplier {
  _id?: ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}


export interface IProduct {
  _id?: ObjectId;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  categoryId: ObjectId;
  supplier: ObjectId;
  slug: string,
  thumbnail: string
}


export interface IEmployee {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  birthDay?: Date,
  password: string;
  photo?: string;
  role: string;
}
