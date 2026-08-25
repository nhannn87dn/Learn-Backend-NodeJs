import type { IProduct } from "./products";
import type { Metadata } from "./response";

export type TCategory = {
  _id: string;
  category_name: string;
  slug: string;
}


export type TCategoryWithProducts = {
  category: TCategory;
  products: IProduct[];
}

export type TCategoryBySlugWithProducts = {
  category: TCategory;
  products: {
    records: IProduct[];
    metadata: Metadata
  }
}