import axiosClient from "@/lib/axiosClient"
import type { IProduct, IProductCreateDTO, IProductUpdateDTO } from "./type"
import type { ApiResponse } from "@/types/response"

interface ProductListResponse {
    records: IProduct[]
    metadata: {
        limit: number
        page: number
        totalRecords: number
        totalPages: number
    }
}

type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
    category?: string;
    brand?: string;
};

export const productsService = {
    getProducts: async (params?: QueryParams): Promise<ApiResponse<ProductListResponse>> => {
        const response = await axiosClient.get('/v1/products', { params })
        return response.data
    },
    getProductById: async (id: string): Promise<ApiResponse<IProduct>> => {
        const response = await axiosClient.get(`/v1/products/${id}`)
        return response.data
    },
    updateById: async (id: string, data: Omit<IProductUpdateDTO, "_id">): Promise<ApiResponse<IProduct>> => {
        const response = await axiosClient.put(`/v1/products/${id}`, data)
        return response.data
    },
    createProduct: async (data: IProductCreateDTO): Promise<ApiResponse<IProduct>> => {
        const response = await axiosClient.post('/v1/products', data)
        return response.data
    },
    deleteById: async (id: string): Promise<ApiResponse<IProduct>> => {
        const response = await axiosClient.delete(`/v1/products/${id}`)
        return response.data
    }
}
