
export interface Product {
  id: number;
  product_name: string;
  price: number;
  description: string;
}
export interface ProductsResponse {
  statusCode: number;
  message: string;
  data: {
    data: Product[];
    totalRecords: number;
    limit: number;
    totalPages: number;
    page: string;
  };
}

export interface ProductResponse {
  statusCode: number;
  message: string;
  data: Product;
}