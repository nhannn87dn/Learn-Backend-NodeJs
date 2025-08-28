import { ProductResponse } from '@/types/product.type';
import React from 'react'



const fetchProduct = async (id: number)  : Promise<ProductResponse> => {
  const response = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/products/${id}`);
  return response.json();
};


const ProductPageDetail = async ({
  params,
}: {
  params: Promise<{ id: number }>
}) => {
  const id = (await params).id;
  //goij api
  const product = await fetchProduct(id);
  return (
    <div>
      <h1>ProductPageDetail {id}</h1>
      <h2 className='font-bold text-xl'>{product.data.product_name}</h2>
      <p><strong>Price:</strong> ${product.data.price}</p>
    </div>
  )
}

export default ProductPageDetail