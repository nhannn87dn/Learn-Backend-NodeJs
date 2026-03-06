import apiClient from "../../libs/axiosClient"

export const getProducts = async({
    page=1,
    limit=10
}: {
    page: number;
    limit: number
})=>{
    const response = await apiClient.get(`v1/products?page=${page}&limit=${limit}`);
    return response.data;
}

export const deleteProductById = async(id: string)=>{
    const response = await apiClient.delete(`v1/products/${id}`);
    return response.data;
}