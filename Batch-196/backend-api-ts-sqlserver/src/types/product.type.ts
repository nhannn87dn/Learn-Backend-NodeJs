import { Brand } from "./brand.type";
import { Category } from "./category.type";

export interface ProductDocument {
  _id: string;
  product_name: string;
  price: number;
  discount: number;
  category: Category;
  brand: Brand;
  description: string;
  model_year: number;
  slug: string;
  thumbnail: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  product_name: string;
  price: number;
  discount?: number;
  category: string;
  brand: string;
  description?: string;
  model_year?: number;
  slug: string;
  thumbnail?: string;
  stock?: number;
}

export interface UpdateProductDto {
  product_name?: string;
  price?: number;
  discount?: number;
  category?: string;
  brand?: string;
  description?: string;
  model_year?: number;
  slug?: string;
  thumbnail?: string;
  stock?: number;
}
