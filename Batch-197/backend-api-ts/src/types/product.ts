export type TProduct = {
    id: number;
    product_name: string;
    description: string;
    price: number;
    discount: number;
    category: string;
    brand: string;
    model_year: number;
    slug: string;
    thumbnail: string;
    stock: number;
}

export type CreateProductDto = {
    product_name: string;
    description?: string;
    price: number;
    discount?: number;
    category: string;
    brand: string;
    model_year: number;
    slug: string;
    thumbnail?: string;
    stock?: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;


export type QueryParams = {
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
  brand?: string;
  sortBy?: string;
  sortType?: "asc" | "desc";
};