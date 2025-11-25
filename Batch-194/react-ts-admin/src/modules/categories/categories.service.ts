import apiClient from "../../libs/axiosClient";

export const getAllCategories = async ({
    page = 1,
    limit = 50}) => {
    const response = await apiClient.get(`/v1/categories?page=${page}&limit=${limit}`);
    return response.data;
}