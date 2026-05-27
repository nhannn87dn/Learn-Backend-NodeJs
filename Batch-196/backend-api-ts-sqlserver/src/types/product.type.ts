export interface CreateProductDto {
  productName: string;
  price: number;
  discount?: number;
  categoryId: number;
  brandId: number;
  description?: string;
  modelYear: number;
  slug?: string;
  thumbnail?: string;
  stock?: number;
}

export interface UpdateProductDto {
  productName?: string;
  price?: number;
  discount?: number;
  categoryId?: number;
  brandId?: number;
  description?: string;
  modelYear?: number;
  slug?: string;
  thumbnail?: string;
  stock?: number;
}
