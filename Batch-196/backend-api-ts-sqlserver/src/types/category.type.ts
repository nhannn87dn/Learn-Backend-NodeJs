export interface Category {
  id: number;
  categoryName: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  categoryName: string;
  description?: string;
  slug: string;
}

export interface UpdateCategoryDto {
  categoryName?: string;
  description?: string;
  slug?: string;
}
