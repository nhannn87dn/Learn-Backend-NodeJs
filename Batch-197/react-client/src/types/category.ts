import type { IProduct } from "./products";

export type TCategory = {
  _id: string;
  category_name: string;
  slug: string;
}


export type TCategoryWithProducts = {
  category: TCategory;
  products: IProduct[];
}