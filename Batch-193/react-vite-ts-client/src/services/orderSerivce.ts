import { env } from "@/constants/env";
import axios from "axios";

export const createOrder = async (orderData: any) => {
     const response = await axios.post(`${env.BACKEND_URL_API}/v1/orders`, orderData);
    return response.data.data;
 
};
