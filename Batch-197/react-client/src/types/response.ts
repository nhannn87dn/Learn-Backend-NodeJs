export interface ApiResponse<T>{
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface Metadata {
  totalRecords: number;
  totalPages: number;
  page: number;
  limit: number;
}