
export interface Category {
  id: number;
  category_name: string;
  description: string;
}
export interface CategoriesResponse {
  statusCode: number;
  message: string;
  data: {
    data: Category[];
    totalRecords: number;
    limit: number;
    totalPages: number;
    page: string;
  };
}
