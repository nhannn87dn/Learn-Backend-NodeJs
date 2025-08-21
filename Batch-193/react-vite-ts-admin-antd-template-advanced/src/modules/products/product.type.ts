
export interface ProductType {
  _id: string;
  id: number;
  product_name: string;
  price: number;
  stock: number;
  thumbnail: string;
  category_id: CategoryType;
  brand_id: BrandType;
}

export interface ProductDTO {
  product_name: string;
  price: number;
  stock: number;
  thumbnail: string;
  category_id: string;
  brand_id: string;
  discount: number;
  model_year: number;
  slug: string;
  description?: string;
}

export interface ProductsResponse {
  products: ProductType[],
  limit: number;
  page: number;
  totalRecords: number;
}

export interface CategoryType {
  _id: string;
  id: number;
  category_name: string;
}

export interface BrandType {
    _id: string;
  id: number;
  brand_name: string;
  image: string;
}
