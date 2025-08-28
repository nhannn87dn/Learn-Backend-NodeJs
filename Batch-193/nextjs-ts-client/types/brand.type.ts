
export interface Brand {
  id: number;
  brand_name: string;
  description: string;
}
export interface BrandsResponse {
  statusCode: number;
  message: string;
  data: {
    data: Brand[];
    totalRecords: number;
    limit: number;
    totalPages: number;
    page: string;
  };
}
