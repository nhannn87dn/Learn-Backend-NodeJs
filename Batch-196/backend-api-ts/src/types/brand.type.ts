export interface Brand {
  _id: string;
  brand_name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandDto {
  brand_name: string;
  description?: string;
  slug: string;
}

export interface UpdateBrandDto {
  brand_name: string;
  description?: string;
  slug: string;
}