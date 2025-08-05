
export interface ProductType {
  id: string;
  product_name: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface ProductsResponse {
  products: ProductType[],
  limit: number;
  page: number;
  totalRecords: number;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}
