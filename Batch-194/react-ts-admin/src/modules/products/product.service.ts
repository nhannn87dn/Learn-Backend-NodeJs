import apiClient from "../../libs/axiosClient";

export const getProducts = async ({
    page = 1,
    limit = 10
}) => {
    const response = await apiClient.get(`/v1/products?page=${page}&limit=${limit}`);
    // bắt buộc phải trả về data
    return response.data;
}

export const deleteProductById = async (id: string) => {
    const response = await apiClient.delete(`/v1/products/${id}`);
    return response.data;
}

export const createProduct = async (product: any) => {
    const response = await apiClient.post('/v1/products', product);
    return response.data;
}


export const updateProductById = async ({
    id,
        product
}: { id: string, product: any }) => {
    const response = await apiClient.put(`/v1/products/${id}`, product);
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/v1/products/${id}`);
    return response.data;
}


export const getBrands = async () => {
    const response = await apiClient.get('/v1/brands?limit=100');
    return response.data;
}