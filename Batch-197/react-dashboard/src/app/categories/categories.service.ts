import axiosClient from "@/lib/axiosClient"
import type { ICategory } from "./type"
import type { ApiResponse } from "@/types/response"

interface CategoryListResponse {
    records: ICategory[]
    metadata: {
        limit: number
        page: number
        totalRecords: number
        totalPages: number
    }
}

export const categoriesService = {
    getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
        const response = await axiosClient.get('/v1/categories')
        return response.data
    },
    getCategoryById: async (id: string): Promise<ApiResponse<ICategory>> => {
        const response = await axiosClient.get(`/v1/categories/${id}`)
        return response.data
    },
    updateById: async (id: string, data: Partial<ICategory>): Promise<ApiResponse<ICategory>> => {
        const response = await axiosClient.put(`/v1/categories/${id}`, data)
        return response.data
    },
    createCategory: async (data: Partial<ICategory>): Promise<ApiResponse<ICategory>> => {
        const response = await axiosClient.post('/v1/categories', data)
        return response.data
    },
    deleteById: async (id: string): Promise<ApiResponse<ICategory>> => {
        const response = await axiosClient.delete(`/v1/categories/${id}`)
        return response.data
    }
}