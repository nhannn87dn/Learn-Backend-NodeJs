export interface Category {
  _id: string;
  category_name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  category_name: string;
  description?: string;
  slug: string;
}

export interface UpdateCategoryDto {
  category_name?: string;
  description?: string;
  slug?: string;
}
