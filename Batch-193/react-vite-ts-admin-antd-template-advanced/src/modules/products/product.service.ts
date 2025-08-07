import apiClient from "../../libs/axiosClient";
import type { ProductType } from "./product.type";


export const fetchCategories = async () => {
 const response = await apiClient.get(`/v1/categories`);
 return response.data
};

export const fetchBrands = async () => {
   const response = await apiClient.get(`/v1/brands`);
   return response.data
};

//Hàm get Sản phẩm
export const fetchProducts = async (page: number, limit = 10) => {
   const response = await apiClient.get(`/v1/products?page=${page}&limit=${limit}`);
   return response.data
};


export const fetchDelete = async (id: string) =>{
   const response = await apiClient.delete(`/v1/products/${id}`);
  return response.data;
}

export const updateData = async (data: {id: string, formData: ProductType}) => {
   const {id, formData} = data;
  const response = await apiClient.put(`/v1/products/${id}`, formData);
   return response.data
};


export const fetchCreate = async (formData: ProductType) => {
   const response = await apiClient.post(`/v1/products`, formData);
   return response.data
};
