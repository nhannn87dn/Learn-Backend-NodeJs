export interface BrandDto {
  id: number;
  brandName: string;
  description?: string | null;
  slug?: string | null;
}

export interface CreateBrandDto {
  brandName: string;
  description?: string;
  slug?: string;
}

export interface UpdateBrandDto {
  brandName?: string;
  description?: string;
  slug?: string;
}