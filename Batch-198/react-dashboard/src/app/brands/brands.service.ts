import axiosClient from "@/lib/axiosClient"
import type { IBrand, IBrandOption } from "./type"
import type { ApiResponse } from "@/types/response"

interface BrandListResponse {
    records: IBrand[]
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
};

export const brandsService = {
    getBrands: async (params?: QueryParams): Promise<ApiResponse<BrandListResponse>> => {
        const response = await axiosClient.get('/v1/brands', { params })
        return response.data
    },
    getBrandsSelect: async (): Promise<ApiResponse<IBrandOption[]>> => {
        const response = await axiosClient.get('/v1/brands/select-options')
        return response.data
    },
    getBrandById: async (id: string): Promise<ApiResponse<IBrand>> => {
        const response = await axiosClient.get(`/v1/brands/${id}`)
        return response.data
    },
    updateById: async (id: string, data: Partial<IBrand>): Promise<ApiResponse<IBrand>> => {
        const response = await axiosClient.put(`/v1/brands/${id}`, data)
        return response.data
    },
    createBrand: async (data: Partial<IBrand>): Promise<ApiResponse<IBrand>> => {
        const response = await axiosClient.post('/v1/brands', data)
        return response.data
    },
    deleteById: async (id: string): Promise<ApiResponse<IBrand>> => {
        const response = await axiosClient.delete(`/v1/brands/${id}`)
        return response.data
    }
}